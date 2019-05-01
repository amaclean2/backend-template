const
	service = "operations",
	validator = require(`../validators/${service}`)
	mongodb = require('mongodb'),
	ObjectID = mongodb.ObjectID

module.exports.set = (app, db) => {
	console.log(`${service} connection ready`)

	// GET Calls
	app.get(`/api/${service}`, async (request, response) => {
		const dbCall = new Promise((resolve, reject) => {
			db.collection(service).find({}).toArray((error, data) => {
				(error) ? reject(error) : resolve(data)
			})
		})

		let data
		try {
			data = await dbCall
		} catch (error) {
			responnse.status(400).json({
				errors: errors,
				context: request.body
			})
		}

		response.status(200).json(data)
	})

	app.get(`/api/${service}/:id`, async (request, response) => {
		const _id = new ObjectID(request.params.id)

		const dbCall = new Promise((resolve, reject) => {
			db.collection(service).findOne({ _id }, (error, data) => {
				(error) ? reject(error) : resolve(data)
			})
		})

		let data

		try {
			data = await dbCall
		} catch (error) {
			responnse.status(400).json({
				errors: errors,
				context: request.body
			})
		}

		response.status(200).json(data)
	})




	// Alter DB Calls
	app.post(`/api/${service}`, (request, response) => {
		if (!request.body || (Object.entries(request.body).length === 0 && request.body.constructor === Object)) {
			response.status(204).json({
				errors: "body required",
				context: request.body
			})
			return
		}
		const validateMessage = validator.validatePost(request.body)
		if (validateMessage !== true) {
			response.status(206).json({
				errors: validateMessage,
				context: request.body
			})
			return
		}

		let newDocument = {
			created_at: new Date().getTime(),
			updated_at: new Date().getTime(),
			operation_information: request.body
		}

		db.collection(service).insertOne(newDocument, (error, data) => {
			if (error) {
				response.status(400).json({
					errors: error,
					context: newDocument
				})
			} else {
				response.status(200).json({
					message: "Data successfully added",
					data: newDocument
				})
			}
		})
	})

	app.put(`/api/${service}`, (request, response) => {
		if (!request.body || (Object.entries(request.body).length === 0 && request.body.constructor === Object)) {
			response.status(204).json({
				errors: "body required",
				context: request.body
			})
			return
		}

		const validateMessage = validator.validatePut(request.body)
		if (validateMessage !== true) {
			response.status(206).json({
				errors: validateMessage,
				context: request.body
			})
			return
		}

		let newDocument = {
			...request.body,
			updated_at: new Date().getTime()
		},
			_id = new ObjectID(body._id)

		newDocument = { $set: newDocument }

		db.collection(service).updateOne({ _id }, newDocument, (error, data) => {
			if (error) {
				response.status(400).json({
					errors: error,
					context: newDocument
				})
			} else {
				response.status(200).json({
					message: "Data successfully modified",
					data: newDocument
				})
			}
		})
	})

	app.delete(`/api/${service}/:id`, (request, response) => {
		const _id = new ObjectID(request.params.id)
		db.collection(service).deleteOne({ _id }, (error, data) => {
			if (error) {
				response.status(400).json({
					errors: error,
					context: newDocument
				})
			} else {
				response.status(200).send({
					message: 'Data deleted'
				})
			}
		})
	})
}