module.exports.validatePost = body => {
    switch(true) {
        case !!body._id :
                return "_id field not allowed in this request"

        case !!body.created_at :
                return "created_at field not allowed in this request"

        case !!body.updated_at :
                return "updated_at field not allowed in this request"

        case !body.operation_number :
            return "operation_number field required"

        case typeof operation_number !== "string" :
            return "operation_number field must be a string"

        case !body.operation_name :
            return "operation_name field required"

        case typeof body.operation_name !== "string" :
            return "operation_name field must be a string"

        case !body.operation_actor :
            return "operation_actor field required"

        case typeof body.operation_actor !== "string" :
            return "operation_actor field must be a string"

        case !body.operation_due_date :
            return "operation_due_date field required"

        case typeof body.operation_due_date !== "string" :
            return "operation_due_date field must be a string"

        case !body.operation_start_date :
            return "operation_start_date field required"

        case typeof body.operation_start_date !== "string" :
            return "operation_start_date field must be a string"

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

        case !body.updated_at :
            return "updated_at field required"

        case !body.operation_information.operation_number :
            return "operation_number field required"

        case typeof body.operation_information.operation_number !== "string" :
            return "operation_number field must be a string"

        case !body.operation_information.operation_name :
            return "operation_name field required"

        case typeof body.operation_information.operation_name !== "string" :
            return "operation_name field must be a string"

        case !body.operation_information.operation_actor :
            return "operation_actor field required"

        case typeof body.operation_information.operation_actor !== "string" :
            return "operation_actor field must be a string"

        case !body.operation_information.operation_due_date :
            return "operation_due_date field required"

        case typeof body.operation_information.operation_due_date !== "string" :
            return "operation_due_date field must be a string"

        case !body.operation_information.operation_start_date :
            return "operation_start_date field required"

        case typeof body.operation_information.operation_start_date !== "string" :
            return "operation_start_date field must be a string"
            
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