import methodOverride from 'method-override'
import partials from 'express-partials'
import bodyParser from 'body-parser'
import mongoose	from 'mongoose'
import passport from 'passport'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import SocketIO from 'socket.io'

import headers from './middlewares/headers'
import { router } from './routes/routes'
import config from './config/main'

let app = express()
let server = http.Server(app)
let io = new SocketIO(server)

mongoose.connect(config.database)

app.use(headers)
app.use(cors({
	exposedHeaders: config.corsHeaders
}))
app.use(partials())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

app.use(router)

app.listen(config.port || 3000, () => {
	console.log('Server listening on port ', config.port)
})

export default app
