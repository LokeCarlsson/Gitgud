import { register, login } from '../controllers/userController'
import express from 'express'
import passport from 'passport'

const requireLogin = passport.authenticate('local', { session: true })

export default (app) => {
  const router = express.Router()
  router.post('/register', register)
  router.post('/login', requireLogin, login)
  app.use('/', router)
}
