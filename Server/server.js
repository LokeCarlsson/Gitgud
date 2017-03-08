import githubwebhook from 'express-github-webhook'
import methodOverride from 'method-override'
import partials from 'express-partials'
import bodyParser from 'body-parser'
import mongoose	from 'mongoose'
import passport from 'passport'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'

import headers from './middlewares/headers'
import { router } from './routes/routes'
import config from './config/main'

const webhookHandler = githubwebhook({ path: '/webhook', secret: 'secret' });

let app = express()
app.server = http.createServer(app)

mongoose.connect(config.database)

app.use(cors({
	exposedHeaders: config.corsHeaders
}))
app.use(webhookHandler)
app.use(headers)
app.use(partials())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

webhookHandler.on('*', function (event, repo, data) {
	console.log('event - ', event)
	console.log('repo - ', repo)
	console.log('data - ', data)
})

app.use(router)

app.server.listen(config.port || 3000, () => {
	console.log('Server listening on port ', config.port)
})

export default app
