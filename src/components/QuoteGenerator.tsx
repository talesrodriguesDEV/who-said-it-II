import React, { type ReactElement } from 'react'
import quoteCategories from '../utils/quoteCategories'
import { type IQuoteGeneratorProps } from '../interfaces'

export default function QuoteGenerator ({ generateTrivia, setQuoteCategory }: IQuoteGeneratorProps): ReactElement {
  return (
    <div className='flex flex-col w-2/3 md:w-1/2 lg:w-1/4 mb-4'>
      <select className='p-2 rounded-lg  mb-4 bg-white border' onChange={({ target }) => { setQuoteCategory(target.value) }}>
        <option value=''>Any keyword</option>
        {quoteCategories.map((category, index) => (
          <option key={index} value={category}>
            {category.replace(category.charAt(0), category.charAt(0).toUpperCase())}
          </option>
        ))}
      </select>
      <button className='button' onClick={generateTrivia}>Find Quote</button>
    </div>
  )
}
