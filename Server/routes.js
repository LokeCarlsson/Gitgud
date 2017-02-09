import quoter from './quoter'
import Router from 'koa-router'
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'Welcome to gitgud API!'
})

router.get('/api/random', async (ctx, next) => {
  ctx.body = quoter()
})

router.get('*', async (ctx, next) => {
  ctx.body = {
    code: ctx.status,
    error: 'not a valid request'
  }
})

export default router
