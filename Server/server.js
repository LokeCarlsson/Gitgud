const dotenv       = require('dotenv')
const logger       = require('koa-morgan')
const http         = require('http')
const cors         = require('koa-cors')
const errorhandler = require('koa-err-handler')
const bodyParser   = require('koa-body-parser')
const koa          = require('koa')

const app = new koa()

app.use(ctx => {
  ctx.body = 'Hello Koa'
})


console.log('listening on port 3000');

app.listen(3000)
