import methodOverride from 'method-override'
import partials from 'express-partials'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose	from 'mongoose'
import passport from 'passport'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'

import { router } from './routes/routes'
import config from './config/main'

let app = express()
app.server = http.createServer(app)

mongoose.connect(config.database)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(partials())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(session({ secret: 's32sw342e2', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

app.use(router)

app.server.listen(config.port || 3000, () => {
	console.log('Server listening on port ', config.port)
})

export default app
