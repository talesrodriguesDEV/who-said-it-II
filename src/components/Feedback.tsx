import React, { type ReactElement } from 'react'
import { type IFeedbackProps } from '../interfaces'

export default function Feedback ({ feedback, authorInfo, saveQuote }: IFeedbackProps): ReactElement {
  return (
    <>
      <div>
        <h3>{feedback}</h3>
        <p>{authorInfo}</p>
        <button onClick={saveQuote}>
          Save quote
        </button>
      </div>
    </>
  )
}
