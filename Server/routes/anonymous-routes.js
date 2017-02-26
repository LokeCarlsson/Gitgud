import express from 'express'
import quoter from '../quoter'

let app = express.Router()

app.get('/api/random-quote', (req, res) => {
  res.status(200).send(quoter())
})

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome!')
})

export default app
