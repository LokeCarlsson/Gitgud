import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import Github from '../models/githubModel'
import config from '../config/main'
import passport from 'passport'
import passportService from '../config/passport'

const generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800
  })
}

const setUserInfo = (request) => {
  return {
    _id: request._id,
    username: request.username,
  }
}

export const register = (req, res, next) => {
  const displayName = req.user.displayName
  const username = req.user.username
  const profileUrl = req.user.profileUrl
  const avatarUrl = req.user._json.avatar_url
  const bio = req.user._json.bio

  const userScheme = setUserInfo(req.user)

  Github.findOne({
    username: username
  }, (err, existingUser) => {
    if (err)
      return next(err)

    if (existingUser)
      return next(existingUser)

    let githubUser = new Github({
      displayName: displayName,
      username: username,
      profileUrl: profileUrl,
      avatarUrl: avatarUrl,
      bio: bio
    })

    githubUser.save((err, user) => {
      if (err)
        return next(err)

      res.status(201).json({
        id_token: 'JWT ' + generateToken(userScheme),
        user: userScheme
      })
    })
  })
}

export const login = (req, res) => {
  const userInfo = setUserInfo(req.user)

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  })
}

