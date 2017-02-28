import { register, login } from '../controllers/userController'
import express from 'express'
import passport from 'passport'
import passportService from '../config/passport'

const requireLogin = passport.authenticate('local', { session: true })
const router = express.Router()

export default (app) => {
  router.post('/register', register)
  router.post('/login', requireLogin, login)
  app.use('/', router)
}
