import errorhandler from 'errorhandler'
import bodyParser   from 'body-parser'
import mongoose			from 'mongoose'
import passport     from 'passport'
import express      from 'express'
import morgan       from 'morgan'
import dotenv       from 'dotenv'
import cors         from 'cors'
import http         from 'http'

import anonymousRoutes from './routes/anonymous-routes'
import protectedRoutes from './routes/protected-routes'
import userRoutes      from './routes/user-routes'
import config 			   from './config/main'

let app = express()
app.server = http.createServer(app)

mongoose.connect(config.database)

dotenv.load()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message)
  } else {
    next(err)
  }
})

app.use(morgan('dev'))
app.use(errorhandler())

app.use(passport.initialize())
app.use(passport.session())

app.use(anonymousRoutes)
app.use(protectedRoutes)
// anonymousRoutes(app)
// protectedRoutes(app)
userRoutes(app)


app.server.listen(config.port || 3000, () => {
	console.log('Server listening on port ', config.port)
})

export default app
