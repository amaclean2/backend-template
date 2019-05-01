const
	service = "API_NAME"
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	portId = require('../pathDescription').portId,
	// mongodb = require('mongodb'),
	// url = require('../pathDescription').pathName,
	useCases = require(`./useCases/${service}`),
	// MongoClient = mongodb.MongoClient,
	should = chai.should()

let
	// db,
	lookupId,
	pathString = `http://localhost:${portId}/api`

chai.use(chaiHttp)

console.log("npm start is required before tests can begin")

const clearDb = done => {
	MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
		if (err) throw err;
		db = client.db("toolbox")
	
		db.collection(service).deleteMany({}, error => {
			done()
		})
	})
}

describe(service, () => {
	before( done => {
		// clearDb(done)
		done()
	})
	
	// Testing GET request
	describe("/GET data", () => {
		useCases.get.forEach( item => {
			it(item.description, done => {
				chai.request(pathString)
				.get(`/${service}`)
				.end( (error, response) => {
					item.checks(response, should)
					done()
				})
			})
		})
	})

	// Testing POST request
	describe("/POST data", () => {
		useCases.post.forEach( item => {
			it(item.description, done => {
				chai.request(pathString)
				.post(`/${service}`)
				.send(item.body)
				.end( (error, response) => {
					// lookupId = response.body && response.body.data && response.body.data._id
					item.checks(response, should)
					done()
				})
			})
		})
	})

	// Testing individual GET request
	describe("/GET individual data", () => {
		useCases.getI.forEach( item => {
			it(item.description, done => {

				const checkId = item.checkId === "id"
					? "0"
					: item.checkId

				chai.request(pathString)
				.get(`/${service}/${checkId}`)
				.end( (error, response) => {
					item.checks(response, should)
					done()
				})
			})
		})
	})

	// Testing PUT request
	describe("/PUT data", () => {
		useCases.put.forEach( item => {
			it(item.description, done => {

				if (item.body.id) item.body.id = lookupId;
				
				chai.request(pathString)
				.put(`/${service}`)
				.send(item.body)
				.end( (error, response) => {
					item.checks(response, should)
					done()
				})
			})
		})
	})

	// Testing DELETE request
	describe("/DELETE data", () => {
		useCases.delete.forEach( item => {
			it(item.description, done => {
				
				const checkId = item.checkId === "id"
					? "0"
					: item.checkId
				
				chai.request(pathString)
				.delete(`/${service}/${checkId}`)
				.end( (error, response) => {
					item.checks(response, should)
					done()
				})
			})
		})
	})
})