import fakeAuthors from '../utils/fakeAuthors'

export function generateRandomFakeAuthors (): string[] {
  return fakeAuthors.sort(() => Math.random() - 0.5).filter((_author, index) => index < 4)
}
