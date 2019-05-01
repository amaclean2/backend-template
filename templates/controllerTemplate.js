const
	service = "API_NAME",
	validator = require(`../validators/${service}`)
	sanitizer = require(`../sanitizers/${service}`)
	// mongodb = require('mongodb'),
	// ObjectID = mongodb.ObjectID

module.exports.set = app => {
	console.log(`${service} connection ready`)

	// GET Calls
	app.get(`/api/${service}`, (request, response) => {
		response.status(200).json([])
	})

	app.get(`/api/${service}/:id`, (request, response) => {
		if(request.params.id) {
			response.status(200).json({})
		} else {
			response.status(400).json({
				errors: "id field required"
			})
		}
	})

	// Alter DB Calls
	app.post(`/api/${service}`, (request, response) => {

		const cleanBody = sanitizer.sanitizePost(request.body)
		const validateMessage = validator.validatePost(cleanBody)

		if (validateMessage !== true) {
			response.status(206).json({
				errors: validateMessage,
				data: cleanBody
			})
			return
		}

		response.status(200).json({
			data: cleanBody,
			message: "data received"
		})
	})

	app.put(`/api/${service}`, (request, response) => {

		const cleanBody = sanitizer.sanitizePut(request.body)
		const validateMessage = validator.validatePut(cleanBody);

		if (validateMessage !== true) {
			response.status(206).json({
				errors: validateMessage,
				data: cleanBody
			})
			return
		}

		response.status(200).json({
			data: cleanBody,
			message: "object updated"
		})
	})

	app.delete(`/api/${service}/:id`, (request, response) => {
		if (request.params.id) {
			response.status(200).json({
				message: "object successfully deleted"
			})
		} else {
			response.status(404).json({
				message: "id field required in url"
			})
		}
	})
}