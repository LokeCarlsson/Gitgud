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
export let io = new SocketIO(server)

io.on('connection', function(client){})
io.listen(3001)


function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

setInterval(sendTime, 3000);

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
