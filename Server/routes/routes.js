import { register, login } from '../controllers/userController'
import { save } from '../controllers/githubController'
import express from 'express'
import passport from 'passport'
import passportService from '../config/passport'
import user from '../models/userModel'

const requireAuth = passport.authenticate('jwt', { session: true })
const requireLogin = passport.authenticate('github', { scope: [ 'user:email' ] })

export const router = express.Router()

router.get('/register', register)
router.get('/login', requireLogin, login)
// router.get('/login', (req, res) => {
//   res.redirect('/auth/github')
// })

router.get('/auth/github', requireLogin, (req, res) => {
  res.status(200).send("Should not display this!!")
})

router.get('/auth/user', (req, res) => {
  res.status(200).send(req.user)
})

router.get('/auth/github/callback', passport.authenticate('github', 
{ failureRedirect: '/fail' }), 
(req, res, next) => {
  register(req, res, next)
  // res.redirect('/account')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/account', requireAuth, (req, res) => {
  res.status(200).send(req.user)
})

router.get('/fail', (req, res) => {
  res.status(200).send("Hahha, you failed!! /fail")
})

router.get('/', (req, res) => {
  res.status(200).send('Welcome to gitgud')
})

router.post('/webhook', (req, res) => {
  console.log(req.body)
  res.status(200).send('Yeeey, nice work pal!')
})


function ensureAuthenticated(req, res, next) {
  console.log('Am i logged in? ', req.isAuthenticated())
  if (req.isAuthenticated()) { return next() }
  res.redirect('/fail')
}