const
	validator = require('../validators/jobs'),
	ObjectID = require('mongodb').ObjectID,
	service = "jobs"

module.exports.set = (app, db) => {
	console.log('jobs connection ready')

	// GET calls
	app.get(`/api/${service}`, async (request, response) => {
		const dbCall = new Promise((resolve, reject) => {
			db.collection(service).find({}).toArray((error, data) => {
				(error) ? reject(error) : resolve(data)
			})
		});

		const partsCall = new Promise((resolve, reject) => {
			db.collection('parts').find({}).toArray((error, parts) => {
				(error) ? reject(error) : resolve(parts)
			})
		})

		let data, partsData
		try {
			data = await dbCall
			partsData = await partsCall
		} catch (error) {
			responnse.status(400).json({
				errors: errors,
				context: request.body
			})
		}

		data = data.map(point => ({
			...point,
			job_information: {
				...point.job_information,
				part_number: partsData.find(
					part => part._id.toString() === point.job_information.part_number
				).part_information.part_number
			}
		}))

		response.status(200).json(data)
	})

	app.get(`/api/${service}/:id`, async (request, response) => {
		const _id = new ObjectID(request.params.id)

		const dbCall = new Promise((resolve, reject) => {
			db.collection(service).findOne({ _id }, (error, data) => {
				(error) ? reject(error) : resolve(data)
			})
		})

		let responseData

		try {
			responseData = await dbCall
		} catch (error) {
			response.status(400).json({
				errors: error,
				context: request.body
			})
		}

		response.status(200).json(responseData)
	});

	app.get(`/api/${service}/pn/:partNumber`, async (request, response) => {
		const partNumber = request.params.partNumber

		const dbCall = new Promise((resolve, reject) => {
			db.collection(service).find({ "job_information.part_number": partNumber }).toArray((error, jobs) => {
				(error) ? reject(error) : resolve(jobs)
			})
		})

		let data

		try {
			data = await dbCall
		} catch(error) {
			response.status(400).json({
				errors: error,
				context: request.body
			})
		}

		response.status(200).json(data)
	})

	// Alter DB calls
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
			job_information: request.body
		};

		db.collection(service).insertOne(newDocument, (error, job) => {
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
				errors: "Body required",
				context: request.body
			})
			return
		}

		const validateMessage = validator.validatePut(request.body);
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
			_id = new ObjectID(request.body._id)

		newDocument = { $set: newDocument };

		db.collection(service).updateOne({ _id }, newDocument, (error, job) => {
			if (error) {
				response.status(400).json({
					erorrs: error,
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
		const _id = new ObjectID(request.params.id);
		db.collection(service).deleteOne({ _id }, (error, job) => {
			if (error) {
				response.status(400).json({
					errors: error,
					context: null
				})
			} else {
				response.status(200).send({
					message: 'Data deleted'
				})
			}
		});
	});
}