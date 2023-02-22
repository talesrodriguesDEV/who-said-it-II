import React, { useRef, useState, type ReactElement } from 'react'
import { type ITriviaProps, type IQuote } from '../interfaces'
import Feedback from './Feedback'

export default function Trivia ({ alternatives, quoteObj, authorInfo, feedback, setFeedback }: ITriviaProps): ReactElement {
  const alternativeButtons = useRef<HTMLButtonElement[]>([])

  const [authorInfoString, setAuthorInfoString] = useState('')

  const handleAnswer = (alternative: string): void => {
    alternativeButtons.current.forEach(button => {
      if (button.innerText === quoteObj.author) button.style.backgroundColor = 'green'
      else button.style.backgroundColor = 'red'

      button.disabled = true
    })

    if (alternative === quoteObj.author) {
      setFeedback('You got it!')
    } else {
      setFeedback('Not today :(')
    }

    let string = ''
    if (authorInfo !== '') string = `${quoteObj.author}: ${authorInfo}`
    else string = quoteObj.author
    setAuthorInfoString(string)
  }

  const saveQuote = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const localStorageQuotes = localStorage.getItem('fav-quotes')

    let newfavQuotes

    if (localStorageQuotes === null) {
      newfavQuotes = [quoteObj]
      event.currentTarget.innerText = 'Unsave quote'
    } else {
      const previousFavQuotes: IQuote[] = JSON.parse(localStorageQuotes)
      const isQuoteAlreadySaved = previousFavQuotes.some(({ quote }) => quote === quoteObj.quote)

      if (isQuoteAlreadySaved) {
        newfavQuotes = previousFavQuotes.filter(({ quote }) => quote !== quoteObj.quote)
        event.currentTarget.innerText = 'Save quote'
      } else {
        newfavQuotes = [...previousFavQuotes, quoteObj]
        event.currentTarget.innerText = 'Unsave quote'
      }
    }

    localStorage.setItem('fav-quotes', JSON.stringify(newfavQuotes))
  }

  return (
    <>
      <h2>{quoteObj.quote}</h2>
      <div>
        {alternatives.map((alternative, index) => (
          <button
            ref={button => { if (button != null) alternativeButtons.current[index] = button }}
            key={index}
            onClick={() => { handleAnswer(alternative) }}
          >
            {alternative}
          </button>
        ))}
      </div>
      {feedback !== '' && (
        <Feedback authorInfo={authorInfoString} feedback={feedback} saveQuote={saveQuote} />
      )}
    </>
  )
}
