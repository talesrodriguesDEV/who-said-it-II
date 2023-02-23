import React, { type ReactElement, useState, useEffect } from 'react'
import { fetchAuthorInfo, fetchFakeAuthors, fetchQuote } from './api'
import QuoteGenerator from './components/QuoteGenerator'
import Trivia from './components/Trivia'
import { type IQuote } from './interfaces'
import './App.css'
import Loading from './components/Loading'
import Feedback from './components/Feedback'

function App (): ReactElement {
  const [loading, setLoading] = useState(false)

  const [quoteObj, setQuoteObj] = useState<IQuote>({ quote: '', author: '', category: '' })
  const [quoteCategory, setQuoteCategory] = useState('')

  const [fakeAuthors, setFakeAuthors] = useState<string[]>([])
  const [alternatives, setAlternatives] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [authorInfo, setAuthorInfo] = useState('')

  const [favQuotes, setFavQuotes] = useState<IQuote[]>([])
  const [displayFav, setDisplayFav] = useState(false)

  useEffect(() => {
    console.log('oi')

    fetchFakeAuthors().then(fakeAuthors => { setFakeAuthors(fakeAuthors) }).catch(() => { window.alert('Something went wrong.') })
    const localStorageQuotes = localStorage.getItem('fav-quotes')
    if (localStorageQuotes !== null) setFavQuotes(JSON.parse(localStorageQuotes))
  }, [quoteObj])

  const generateTrivia = async (): Promise<void> => {
    setFeedback('')
    setLoading(true)

    try {
      const newQuote = await fetchQuote(quoteCategory)
      setQuoteObj(newQuote)

      const authors = [newQuote.author, ...fakeAuthors].sort(() => Math.random() - 0.5)
      setAlternatives(authors)

      const info = await fetchAuthorInfo(newQuote.author)
      if (info !== '') setAuthorInfo(`${quoteObj.author}: ${info}`)
    } catch (_err) {
      window.alert('Something went wrong.')
    }

    setLoading(false)
  }

  const saveQuote = (event: React.MouseEvent<HTMLButtonElement>, currentQuote: IQuote): void => {
    const localStorageQuotes = localStorage.getItem('fav-quotes')

    let newfavQuotes

    if (localStorageQuotes === null) {
      newfavQuotes = [currentQuote]
      setFavQuotes(newfavQuotes)
      event.currentTarget.innerText = 'Unsave quote'
    } else {
      const previousFavQuotes: IQuote[] = JSON.parse(localStorageQuotes)
      const isQuoteAlreadySaved = previousFavQuotes.some(({ quote }) => quote === currentQuote.quote)

      if (isQuoteAlreadySaved) {
        newfavQuotes = previousFavQuotes.filter(({ quote }) => quote !== currentQuote.quote)
        setFavQuotes(newfavQuotes)
        event.currentTarget.innerText = 'Save quote'
      } else {
        newfavQuotes = [...previousFavQuotes, currentQuote]
        setFavQuotes(newfavQuotes)
        event.currentTarget.innerText = 'Unsave quote'
      }
    }

    localStorage.setItem('fav-quotes', JSON.stringify(newfavQuotes))
  }

  return (
    <div className='flex flex-col items-center h-screen font-light bg-slate-100 text-slate-800'>
      <div className='absolute bottom-0 w-3/4 text-center z-10 bg-slate-100'>
        <p className='font-normal bg-slate-800 rounded-t-lg text-white p-1' onClick={() => { setDisplayFav(prev => !prev) }}>Favorite Quotes</p>
        <div className='border-x border-slate-800'>
          {displayFav && favQuotes.map((fav, index) => (
            <div key={index} className='px-2 py-2 border-b border-slate-800'>
              <p className='text-justify'>{fav.quote} - {fav.author}</p>
              {quoteObj.quote !== fav.quote && <button className='button w-11/12 my-2' onClick={(e) => { saveQuote(e, fav) }}>Unsave Quote</button>}
            </div>
          ))}
        </div>
      </div>
      <h1 className='text-3xl py-8'>Who Said It?</h1>
      <QuoteGenerator generateTrivia={generateTrivia} setQuoteCategory={setQuoteCategory} />
      {loading
        ? <Loading />
        : (
            quoteObj.quote !== '' && (
            <>
              <Trivia
                alternatives={alternatives}
                quoteObj={quoteObj}
                authorInfo={authorInfo}
                feedback={feedback}
                setFeedback={setFeedback}
                saveQuote={saveQuote}
              />
              {feedback !== '' && (
                <Feedback quote={quoteObj} authorInfo={authorInfo} feedback={feedback} saveQuote={saveQuote} />
              )}
            </>
            )
          )
      }
    </div>
  )
}

export default App
