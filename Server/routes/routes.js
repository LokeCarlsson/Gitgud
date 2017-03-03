import { register, login } from '../controllers/userController'
import { save } from '../controllers/githubController'
import express from 'express'
import passport from 'passport'
import passportService from '../config/passport'
import user from '../models/userModel'

const authGithub = passport.authenticate('github', { scope: [ 'user:email' ] })
const requireLogin = passport.authenticate('local', { session: true })

export const router = express.Router()

router.post('/register', register)
router.post('/login', requireLogin, login)

router.get('/auth/github', authGithub, (req, res) => {
  console.log(req.session.passport.user)
  res.status(200).send("Should not display this!!")
})

router.get('/auth/github/callback', passport.authenticate('github', 
{ failureRedirect: '/fail', failureFlash: true }), 
(req, res, next) => {
  save(req, res, next)
  res.redirect('/account')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/account', ensureAuthenticated, (req, res) => {
  res.status(200).json(req.user)
})


router.get('/fail', (req, res) => {
  res.status(200).send("Hahha, you failed!! /fail")
})

router.get('/', (req, res) => {
  res.status(200).send('Welcome to gitgud')
})


function ensureAuthenticated(req, res, next) {
  console.log('Am i logged in? ', req.isAuthenticated())
  if (req.isAuthenticated()) { return next() }
  res.redirect('/fail')
}