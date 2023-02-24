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
  setFeedback: (feedback: string) => void
}

export interface IFeedbackProps {
  feedback: string
  quote: IQuote
}

export interface IFavQuotesProps {
  quoteObj: IQuote
  saveQuote: (event: React.MouseEvent<HTMLButtonElement>, currentQuote: IQuote) => void
  favQuotes: IQuote[]
}
