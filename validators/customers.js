module.exports.validatePost = body => {
    switch(true) {
        case !!body._id :
            return "_id field not allowed in this request"

        case !!body.created_at :
            return "created_at field not allowed in this request"

        case !!body.udpated_at :
            return "updated_at field not allowed in this request"

        case !body.customer_name :
            return "customer_name field required"

        case typeof body.customer_name !== "string" :
            return "customer_name must be a string"

        case !body.added :
            return "added field required"

        case typeof body.added !== "string" :
            return "added field must be a string"

        default :
            return true;
    }
}

module.exports.validatePut = body => {
    switch(true) {
        case !body._id :
            return "_id field required"

        case !body.created_at :
            return "created_at field required"

        case !body.udpated_at :
            return "updated_at field required"

        case !body.customer_information.customer_name :
            return "customer_name field required"

        case typeof body.customer_information.customer_name !== "string" :
            return "customer_name must be a string"

        case !body.customer_information.added :
            return "added field required"

        case typeof body.customer_information.added !== "string" :
            return "added field must be a string"
            
        default :
            return true;
    }
}

module.exports.validateDelete = body => {
	switch(true) {
		default :
			return true;
	}
}