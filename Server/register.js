import _ from 'lodash'
import config from './config'
import Router from 'koa-router'

const router = new Router({ prefix: '/user' })

const users = [{
  id: 1,
  username: 'loke',
  password: 'loke'
}]

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 })
}

function getUserScheme(ctx) {
  let username = ''
  let type = ''
  let userSearch = {}

  console.log(users)
  console.log(ctx)


  // The POST contains a username and not an email
  if(ctx.req.username) {
    username = ctx.req.body.username
    type = 'username'
    userSearch = { username: username }
  }
  // The POST contains an email and not an username
  else if(ctx.req.email) {
    username = ctx.req.body.email
    type = 'email'
    userSearch = { email: username }
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

router.post('*', async (ctx, next) => {
  ctx.res.statusCode = 200

  let userScheme = getUserScheme(ctx.request)

  console.log(userScheme.username)

  if (!userScheme.username || !req.password) {
    return ctx.throw('You must send the username and the password', 400)
  }

  if (_.find(users, userScheme.userSearch)) {
    return ctx.throw('A user with that username already exists', 400)
  }

  var profile = _.pick(ctx.req.body, userScheme.type, 'password', 'extra')
  profile.id = _.max(users, 'id').id + 1

  users.push(profile);

  ctx.res.statusCode = 201
  // send({
  //   id_token: createToken(profile)
  // })

  console.log("ok!!!")

})

export default router
