export interface IQuote {
  quote: string
  author: string
  category: string
}
export interface IAuthor {
  name: string
  title: string
}

export interface IQuoteGeneratorProps {
  generateTrivia: () => void
  setQuoteCategory: (value: string) => void
}

export interface ITriviaProps {
  alternatives: string[]
  quoteObj: IQuote
  authorInfo: string
  feedback: string
  setFeedback: (feedback: string) => void
  saveQuote: (event: React.MouseEvent<HTMLButtonElement>, currentQuote: IQuote) => void
}

export interface IFeedbackProps {
  feedback: string
  authorInfo: string
  saveQuote: (event: React.MouseEvent<HTMLButtonElement>, currentQuote: IQuote) => void
  quote: IQuote
}
