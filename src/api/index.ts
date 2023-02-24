import { type IAuthor, type IQuote } from '../interfaces'

const API_URL = import.meta.env.VITE_API_URL as string
const API_KEY = import.meta.env.VITE_API_KEY as string

const fetchOptions = { headers: { 'X-Api-Key': API_KEY } }

export async function fetchQuote (category: string): Promise<IQuote> {
  const response = await fetch(`${API_URL}/quotes?category=${category}`, fetchOptions)

  if (response.status !== 200) throw new Error()

  const quotes: IQuote[] = await response.json()

  return quotes[0]
}

export async function fetchAuthorInfo (authorName: string): Promise<string> {
  const response = await fetch(`${API_URL}/historicalfigures?name=${authorName}`, fetchOptions)

  const authors: IAuthor[] = await response.json()

  if (authors.length !== 0) return authors[0].title
  return ''
}
