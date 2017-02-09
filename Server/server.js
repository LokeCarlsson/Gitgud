'use strict'

import errorhandler from 'koa-err-handler'
import body         from 'koa-body-parser'
import compress     from 'koa-compress'
import logger       from 'koa-morgan'
import cors         from 'koa-cors'
import dotenv       from 'dotenv'
import http         from 'http'
import koa          from 'koa'

import router from './routes'
import quoter from './quoter'
const app = new koa()

app.use(router.allowedMethods())
app.use(router.routes())

app.listen(3000)
console.info('listening on port 3000')

export default app
