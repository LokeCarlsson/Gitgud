import errorhandler from 'errorhandler'
import bodyParser   from 'body-parser'
import express      from 'express'
import morgan       from 'morgan'
import dotenv       from 'dotenv'
import cors         from 'cors'
import http         from 'http'

import anonymousRoutes from './anonymous-routes'
import protectedRoutes from './protected-routes'
import userRoutes      from './user-routes'

let app = express()

dotenv.load()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message)
  } else {
    next(err)
  }
})

app.use(morgan('dev'))
app.use(errorhandler())

app.use(anonymousRoutes);
app.use(protectedRoutes);
app.use(userRoutes);


http.createServer(app).listen(3000, function (err) {
  console.log('Listening on http://localhost:3000')
})

export default app
