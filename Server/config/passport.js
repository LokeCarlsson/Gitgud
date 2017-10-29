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
  githubUser.findOne({ username: payload.username }, (err, user) => {
    if (err)
      return done(err, false)

    if (user)
      done(null, user)
    else
      done(null, false)
  })
})

const githubOptions = {
  clientID: "f4543dfd8d8586e150a6",
  clientSecret: "c8b264e4d274288c2b368905b00afe7b2c375cea",
  callbackURL: "https://gitgud.lokecarlsson.se:3000/auth/github/callback"
}

const githubLogin = new GitHubStrategy(githubOptions, (accessToken, refreshToken, profile, done) => {
  profile.token = accessToken
  return done(null, profile)
})

passport.use(jwtLogin)
passport.use(githubLogin)
