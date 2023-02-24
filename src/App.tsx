import React, { type ReactElement, useState, useEffect } from 'react'

import QuoteGenerator from './components/QuoteGenerator'
import Trivia from './components/Trivia'
import Loading from './components/Loading'
import Feedback from './components/Feedback'
import FavQuotes from './components/FavQuotes'

import { fetchQuote } from './api'
import { type IQuote } from './interfaces'
import { generateRandomFakeAuthors } from './helpers'
import './App.css'
import defaultQuote from './utils/defaultQuote'

function App (): ReactElement {
  const [loading, setLoading] = useState(false)

  const [quoteObj, setQuoteObj] = useState<IQuote>({ quote: '', author: '', category: '' })
  const [quoteCategory, setQuoteCategory] = useState('')

  const [alternatives, setAlternatives] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')

  const [favQuotes, setFavQuotes] = useState<IQuote[]>([])

  useEffect(() => {
    // fetchFakeAuthors().then(fakeAuthors => { setFakeAuthors(fakeAuthors) }).catch(() => { window.alert('Something went wrong.') })

    const localStorageQuotes = localStorage.getItem('fav-quotes')
    if (localStorageQuotes !== null) setFavQuotes(JSON.parse(localStorageQuotes))
  }, [])

  const generateTrivia = async (): Promise<void> => {
    setFeedback('')
    setLoading(true)

    try {
      const newQuote = await fetchQuote(quoteCategory)
      setQuoteObj(newQuote)

      const fakeAuthors = generateRandomFakeAuthors()
      const authors = [newQuote.author, ...fakeAuthors].sort(() => Math.random() - 0.5)
      setAlternatives(authors)
    } catch (err) {
      setQuoteObj(defaultQuote)

      const fakeAuthors = generateRandomFakeAuthors()
      const authors = [defaultQuote.author, ...fakeAuthors].sort(() => Math.random() - 0.5)
      setAlternatives(authors)
    }

    setLoading(false)
  }

  const saveQuote = (event: React.MouseEvent<HTMLButtonElement>, currentQuote: IQuote): void => {
    const localStorageQuotes = localStorage.getItem('fav-quotes')

    let newfavQuotes

    if (localStorageQuotes === null) {
      newfavQuotes = [currentQuote]
      setFavQuotes(newfavQuotes)
      event.currentTarget.innerText = 'Unsave'
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
        event.currentTarget.innerText = 'Unsave'
      }
    }

    localStorage.setItem('fav-quotes', JSON.stringify(newfavQuotes))
  }

  return (
    <div className='flex flex-col items-center min-h-screen font-light bg-slate-100 text-slate-800'>
      <FavQuotes quoteObj={quoteObj} favQuotes={favQuotes} saveQuote={saveQuote} />
      <h1 className='text-3xl py-8'>Who Said It?</h1>
      <QuoteGenerator generateTrivia={generateTrivia} setQuoteCategory={setQuoteCategory} />
      {loading
        ? <Loading />
        : (
            quoteObj.quote !== '' && (
            <>
              <button className='button w-2/3 md:w-1/2 lg:w-1/4' onClick={(e) => { saveQuote(e, quoteObj) }}>
                Save quote
              </button>
              <Trivia
                alternatives={alternatives}
                quoteObj={quoteObj}
                setFeedback={setFeedback}
              />
              {feedback !== '' && (
                <Feedback quote={quoteObj} feedback={feedback} />
              )}
            </>
            )
          )
      }
    </div>
  )
}

export default App
