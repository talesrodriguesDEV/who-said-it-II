import React, { type ReactElement } from 'react'
import { type IFeedbackProps } from '../interfaces'

export default function Feedback ({ quote, feedback, authorInfo, saveQuote }: IFeedbackProps): ReactElement {
  const feedbackColor = feedback.includes('!') ? 'text-green-700' : 'text-red-700'

  return (
    <div className='w-2/3 md:w-1/2 lg:w-1/4 flex flex-col'>
      <p className={`text-center text-3xl font-medium ${feedbackColor}`}>{feedback}</p>
      <p className='text-center text-xl my-6'>{authorInfo}</p>
      <button className='button' onClick={(e) => { saveQuote(e, quote) }}>
        Save quote
      </button>
    </div>
  )
}
