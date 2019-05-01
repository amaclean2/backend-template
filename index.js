const
	mongodb = require('mongodb'),
	express = require('express'),
	bodyParser = require('body-parser'),
	pathVariables = require('./pathDescription'),
	controllers = require('./controllers'),
	url = pathVariables.pathName,
	portId = pathVariables.portId,
	MongoClient = mongodb.MongoClient,
	app = express()

let db

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

	next()
})

const server = app.listen(portId, () => {
	const port = server.address().port
	console.log("\x1b[0m%s\x1b[36m%s\x1b[0m", "App running on port ", port, "\n")
})

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
	if (err) throw err
	db = client.db('toolbox')

	controllers.set(app, db)
})