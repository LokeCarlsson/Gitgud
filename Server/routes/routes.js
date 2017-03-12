import { register, login } from '../controllers/userController'
import { saveOrgs, getOrgs, fetchOrgs } from '../controllers/githubController'
import express from 'express'
import passport from 'passport'
import passportService from '../config/passport'

const requireAuth = passport.authenticate('jwt', { session: true })
const requireLogin = passport.authenticate('github', { scope: [ 'user', 'admin:org_hook', 'read:org' ] })

export const router = express.Router()

router.get('/register', register)
router.get('/login', requireLogin, login)

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
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/account', requireAuth, (req, res) => {
  res.status(200).send(req.user)
})

router.get('/orgs', requireAuth, (req, res) => {
  getOrgs(req, res)
})

router.get('/orgs/github', requireAuth, (req, res) => {
  fetchOrgs(req, res)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json(error))
})

router.post('/orgs', requireAuth, (req, res) => {
  saveOrgs(req, res)
})

router.get('/fail', (req, res) => {
  res.status(200).send("Hahha, you failed!! /fail")
})

router.post('/webhook', (req, res) => {
  console.log('hoook inc - ', req.body)
  res.status(200).send('Thumbs up!!')
})

router.get('/', (req, res) => {
  res.status(200).send('Welcome to gitgud')
})