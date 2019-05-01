const operations = require("./operations")
const users = require("./users")
const customers = require("./customers")
const parts = require("./parts")
const jobs = require('./jobs')

module.exports.set = (app, db) => {
    jobs.set(app, db)
	parts.set(app, db)
	customers.set(app, db)
	users.set(app, db)
	operations.set(app, db)
}