import jwt from 'jsonwebtoken'
import User from '../models/userModel'
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
  const username = req.body.username
  const password = req.body.password

  var userScheme = setUserInfo(req);

  if (!username)
    return res.status(422).send({
      error: 'You must provide an username.'
    })

  if (!password)
    return res.status(422).send({
      error: 'You must provide a password.'
    })

  User.findOne({
    username: username
  }, (err, existingUser) => {
    if (err)
      return next(err)

    if (existingUser)
      return res.status(422).send({
        error: 'The username is already taken!'
      })

    let user = new User({
      username: username,
      password: password
    })

    user.save((err, user) => {
      if (err)
        return next(err)

      let userInfo = setUserInfo(user)

      res.status(201).json({
        id_token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
    })
  })
}

export const login = (req, res) => {
  const userInfo = setUserInfo(req.user)

  if (!req.body.username)
  return res.status(422).send({
    error: 'You must provide an username.'
  })

  if (!req.body.password)
  return res.status(422).send({
    error: 'You must provide a password.'
  })

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  })
}

