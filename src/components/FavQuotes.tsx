import React, { useState, type ReactElement } from 'react'
import { type IFavQuotesProps } from '../interfaces'

export default function FavQuotes ({ favQuotes, quoteObj, saveQuote }: IFavQuotesProps): ReactElement {
  const [displayFav, setDisplayFav] = useState(false)

  return (
    <div className='fixed bottom-0 w-4/5 md:w-3/4 lg:w-1/2 text-center z-10 bg-slate-100'>
      <p className='font-normal bg-slate-800 rounded-t-lg text-white p-1' onClick={() => { setDisplayFav(prev => !prev) }}>Favorite Quotes</p>
      <div className='border-x border-slate-800'>
        {displayFav && (
          favQuotes.length === 0
            ? (
            <p>You haven&#39;t saved any quotes yet.</p>
              )
            : (
                favQuotes.map((fav, index) => (
                <div key={index} className='px-2 py-2 border-b border-slate-800'>
                  <p className='text-justify'>{fav.quote} - {fav.author}</p>
                  {quoteObj.quote !== fav.quote && <button className='button responsive my-2' onClick={(e) => { saveQuote(e, fav) }}>Unsave</button>}
                </div>
                ))
              )
        )}
      </div>
    </div>
  )
}
