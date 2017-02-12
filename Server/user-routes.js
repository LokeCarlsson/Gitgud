import express from 'express'
import _ from 'lodash'
import config from './config'
import jwt from 'jsonwebtoken'

let app = express.Router()

let users = [{
  id: 1,
  username: 'loke',
  password: 'loke'
}]

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 })
}

function getUserScheme(req) {
  let username
  let type
  let userSearch = {}

  if(req.body.username) {
    username = req.body.username
    type = 'username'
    userSearch = { username: username }
  }
  else if(req.body.email) {
    username = req.body.email
    type = 'email'
    userSearch = { email: username }
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.post('/users', function(req, res) {
  console.log(users)
  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password")
  }

  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("A user with that username already exists")
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra')
  profile.id = _.max(users, 'id').id + 1

  users.push(profile)

  res.status(201).send({
    id_token: createToken(profile)
  })
})

app.post('/sessions/create', function(req, res) {
  let userScheme = getUserScheme(req)

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password")
  }

  var user = _.find(users, userScheme.userSearch)

  if (!user) {
    return res.status(401).send("The username or password don't match")
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match")
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});

export default app
