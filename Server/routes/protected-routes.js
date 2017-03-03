import jwt from 'express-jwt'
import express from 'express'
import config from '../config'
import quoter from '../quoter'

let app = express.Router()

let jwtCheck = jwt({
  secret: config.secret
})

// app.use('/api/protected', jwtCheck);

// app.get('/api/protected/random-quote', function(req, res) {
//   res.status(200).send(quoter())
// })

export default app
