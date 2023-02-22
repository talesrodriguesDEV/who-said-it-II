import React, { type ReactElement } from 'react'
import quoteCategories from '../utils/quoteCategories'
import { type IQuoteGeneratorProps } from '../interfaces'

export default function QuoteGenerator ({ generateTrivia, setQuoteCategory }: IQuoteGeneratorProps): ReactElement {
  return (
    <>
      <label>
        Choose a keyword:
        {' '}
        <select onChange={({ target }) => { setQuoteCategory(target.value) }}>
          <option value=''>All quotes</option>
          {quoteCategories.map((category, index) => (
            <option key={index} value={category}>
              {category.replace(category.charAt(0), category.charAt(0).toUpperCase())}
            </option>
          ))}
        </select>
      </label>
      <button onClick={generateTrivia}>Quote!</button>
    </>
  )
}
