import { register } from '../controllers/userController'
import express from 'express'

export default (app) => {
  const router = express.Router()
  router.post('/register', register)
  // app.post('/login', function(req, res) login)
  app.use('/', router)
}
