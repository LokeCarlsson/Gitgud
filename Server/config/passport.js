import passport from 'passport'
import user from '../models/userModel'
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

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  user.findById(payload._id, (err, user) => {
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
  // user.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return done(err, user)
  // })
    process.nextTick(() => {
      return done(null, profile)
    })

  // user.findOne({
  //   githubId: profile.id
  // }, (err, existingUser) => {
  //   if (err)
  //     return next(err)

  //   if (existingUser) {
  //     existingUser.update((err, user) => {
  //       if (err)
  //         return next(err)

  //       let userInfo = setUserInfo(user)

  //       res.status(201).json({
  //         id_token: 'JWT ' + generateToken(userInfo),
  //         user: userInfo
  //       })
  //     })
  //   } else {
  //     let user = new User({
  //       username: username,
  //       password: password
  //     })

  //     user.save((err, user) => {
  //       if (err)
  //         return next(err)

  //       let userInfo = setUserInfo(user)

  //       res.status(201).json({
  //         id_token: 'JWT ' + generateToken(userInfo),
  //         user: userInfo
  //       })
  //     })
  //   }
  // })
})

passport.use(jwtLogin)
passport.use(localLogin)
passport.use(githubLogin)