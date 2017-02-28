import { register, login } from '../controllers/userController'
import express from 'express'
import passport from 'passport'
import passportService from '../config/passport'
import user from '../models/userModel'

const authGithub = passport.authenticate('github', { scope: [ 'user:email' ] })
const requireLogin = passport.authenticate('local', { session: true })
const router = express.Router()

export default (app) => {
  router.post('/register', register)
  router.post('/login', requireLogin, login)

  router.get('/auth/github', authGithub, (req, res) => {
    console.log('OMGOGMGOMGMOOMGMOGMOGMO!')
    res.status(200).send("Testing testing!!")
  })

  router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/fail', successRedirect: '/success' }, (err, user) => {
    console.log(user)
  // res.status(302).send('So much error')

  // if (!user) {
  //   res.redirect('/fail')
  // }

  // const existingUser = user.findOne({id: user._id})

  // if (!existingUser) {
  //   res.status(403).send('OGMOMGMOGMO NO USER')
  // }

  // res.status(200).send('OMGOMG DID IT WORKWEROKKOWR????')
}))

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

router.get('/test', (req, res) => {
  res.status(200).send("TEsting testing!!")
})

router.get('/fail', (req, res) => {
  res.status(200).send("Hahha, you failed!!")
})

router.get('/success', (req, res) => {
  res.status(200).send("CALLBACK, success!!")
})

  app.use('/', router)
}
