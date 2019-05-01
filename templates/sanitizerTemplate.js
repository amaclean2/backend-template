/*
    body = {
        id: "123",
		notes: "<b>some string that needs to be sanitized</b>",
		badParam: "I am very evil"
    }
*/

module.exports.sanitizePost = body => {
	/*
		body.userNmae = body.userName.trim()
		body.notes = encodeURI(body.notes)
		
		return {
			id: body.id,
			notes: body.notes
		}
	*/

	return body
}

module.exports.sanitizePut = body => {
	return body
}