import React, { useEffect, useState, type ReactElement } from 'react'
import { fetchAuthorInfo } from '../api'
import { type IFeedbackProps } from '../interfaces'
import Loading from './Loading'

export default function Feedback ({ quote, feedback }: IFeedbackProps): ReactElement {
  const feedbackColor = feedback.includes('!') ? 'text-green-700' : 'text-red-700'

  const [authorInfo, setAuthorInfo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuthorInfo(quote.author).then((info: string) => {
      if (info !== '') setAuthorInfo(`${quote.author}: ${info}`)
      setLoading(false)
    }).catch(_err => {
      setLoading(false)
    })
  }, [])

  return (
    <div className='responsive flex flex-col mb-10'>
      {loading
        ? <Loading />
        : (
          <>
            <p className={`text-center text-3xl font-medium ${feedbackColor} mt-6`}>{feedback}</p>
            <p className='text-center text-xl mt-6'>{authorInfo}</p>
          </>
          )
      }
    </div>
  )
}
