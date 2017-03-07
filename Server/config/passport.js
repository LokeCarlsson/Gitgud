import passport from 'passport'
import githubUser from '../models/githubModel'
import config from './main'
import LocalStrategy from 'passport-local'
import GitHubStrategy from 'passport-github2'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import settings from '../config.js'


const localOptions = {
  usernameField: 'username',
  passwordField: 'password'
}

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  user.findOne({ username }, (err, user) => {
    if (err)
    return done(err)

    if (!user)
    return done(null, false, { error: 'Your login details could not be verified. Please try again.' })

    user.comparePassword(password, (err, isMatch) => {
      if (err)
      return done(err)

      if (!isMatch)
      return done(null, false, { error: 'Your login details could not be verified. Please try again.' })

      return done(null, user)
    })
  })
})

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('payload', payload._id)
  githubUser.findById(payload._id, (err, user) => {
    console.log('pleowekewif')
    if (err)
      return done(err, false)

    if (user)
      done(null, user)
    else
      done(null, false)
  })
})

const githubOptions = {
  clientID: "3f3301eacaac9f40bb7f",
  clientSecret: "448476d278392ab649d1e2d57807d878b3b7320a",
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}

const githubLogin = new GitHubStrategy(githubOptions, (accessToken, refreshToken, profile, done) => {
  return done(null, profile)
})

passport.use(jwtLogin)
passport.use(githubLogin)