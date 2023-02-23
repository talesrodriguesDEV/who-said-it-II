import React, { type ReactElement, useState, useEffect } from 'react'
import { fetchAuthorInfo, fetchFakeAuthors, fetchQuote } from './api'
import QuoteGenerator from './components/QuoteGenerator'
import Trivia from './components/Trivia'
import { type IQuote } from './interfaces'
import './App.css'
import Loading from './components/Loading'

function App (): ReactElement {
  const [loading, setLoading] = useState(false)

  const [quoteObj, setQuoteObj] = useState<IQuote>({ quote: '', author: '', category: '' })
  const [quoteCategory, setQuoteCategory] = useState('')

  const [fakeAuthors, setFakeAuthors] = useState<string[]>([])
  const [alternatives, setAlternatives] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [authorInfo, setAuthorInfo] = useState('')

  useEffect(() => {
    fetchFakeAuthors().then(fakeAuthors => { setFakeAuthors(fakeAuthors) }).catch(() => { window.alert('Something went wrong.') })
  }, [])

  const generateTrivia = async (): Promise<void> => {
    setFeedback('')
    setLoading(true)

    try {
      const newQuote = await fetchQuote(quoteCategory)
      setQuoteObj(newQuote)

      const authors = [newQuote.author, ...fakeAuthors].sort(() => Math.random() - 0.5)
      setAlternatives(authors)

      const info = await fetchAuthorInfo(newQuote.author)
      if (info !== '') setAuthorInfo(info)
    } catch (_err) {
      window.alert('Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <>
      <QuoteGenerator generateTrivia={generateTrivia} setQuoteCategory={setQuoteCategory} />
      {loading
        ? <Loading />
        : (
            quoteObj.quote !== '' && (
              <Trivia
                alternatives={alternatives}
                quoteObj={quoteObj}
                authorInfo={authorInfo}
                feedback={feedback}
                setFeedback={setFeedback}
              />
            )
          )
      }
    </>
  )
}

export default App
