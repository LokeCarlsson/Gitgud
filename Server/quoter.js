import quotes from './quotes'

export default function getRandom() {
  let totalAmount = quotes.length
  let rand = Math.floor(Math.random() * totalAmount)
  return quotes[rand]
}
