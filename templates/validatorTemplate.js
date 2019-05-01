module.exports.validatePost = body => {
    switch(true) {
		// case !body.username :
		// 	return "username field required"
        default :
            return true;
    }
}

module.exports.validatePut = body => {
    switch(true) {
        case !body.id :
            return "id field required"
        default :
            return true;
    }
}