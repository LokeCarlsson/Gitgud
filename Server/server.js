import errorhandler from 'koa-err-handler'
import body         from 'koa-body-parser'
import compress     from 'koa-compress'
import logger       from 'koa-morgan'
import cors         from 'koa-cors'
import dotenv       from 'dotenv'
import http         from 'http'
import koa          from 'koa'

import rootRouter from './routes'
import userRouter from './register'
import quoter from './quoter'

const app = new koa()

app.use(rootRouter.allowedMethods())
app.use(rootRouter.routes())
app.use(userRouter.allowedMethods())
app.use(userRouter.routes())

app.listen(3000)
console.info('listening on port 3000')

export default app
