export function generateRandomTwoLetters (): string {
  const randomizer1 = Math.floor(Math.random() * (91 - 65) + 65)
  const randomizer2 = Math.floor(Math.random() * (91 - 65) + 65)

  return String.fromCharCode(randomizer1, randomizer2)
}
