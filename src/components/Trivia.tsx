import React, { useRef, type ReactElement } from 'react'
import { type ITriviaProps } from '../interfaces'

export default function Trivia ({ alternatives, quoteObj, setFeedback }: ITriviaProps): ReactElement {
  const alternativeButtons = useRef<HTMLButtonElement[]>([])

  const handleAnswer = (alternative: string): void => {
    alternativeButtons.current.forEach(button => {
      if (button.innerText === quoteObj.author) button.style.backgroundColor = '#111827'
      else button.style.backgroundColor = '#374151'

      button.disabled = true
    })

    if (alternative === quoteObj.author) {
      setFeedback('You got it!')
    } else {
      setFeedback('Not today :(')
    }
  }

  return (
    <>
      <p className='my-6 px-10'>&#34;{quoteObj.quote}&#34;</p>
      <div className='flex flex-col'>
        {alternatives.map((alternative, index) => (
          <button
            className='button my-2'
            ref={button => { if (button != null) alternativeButtons.current[index] = button }}
            key={index}
            onClick={() => { handleAnswer(alternative) }}
          >
            {alternative}
          </button>
        ))}
      </div>
    </>
  )
}
