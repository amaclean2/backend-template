module.exports.validatePost = body => {
    switch(true) {
        case !!body.created_at :
            return 'No created_at field allowed in this request';

        case !!body.updated_at :
            return 'No updated_at field allowed in this request';

        case !!body._id :
            return 'No _id field allowed in this request';

        case !body.job_number :
            return 'job_number field required';

        case typeof(body.job_number) !== 'string' :
            return 'job_number must be a string';

        case !body.part_number :
            return 'part_number field required';

        case typeof(body.part_number) !== 'string' :
            return 'part_number must be a string';

        default :
            return true;
    }
}

module.exports.validatePut = body => {
    switch(true) {
        case !body.created_at :
            return 'created_at field required';

        case !body.updated_at :
            return 'updated_at field required';

        case !body._id :
            return '_id field required';

        case !body.job_information :
            return 'job_information object required';

        case !body.job_information.job_number :
            return 'job_number field required in job_information';

        case typeof(body.job_information.job_number) !== 'string' :
            return 'job_number must be a string';

        case !body.job_information.part_number :
            return 'part_number field required in job_information';

        case typeof(body.job_information.part_number) !== 'string' :
            return 'part_number must be a string';

        default :
            return true;
    }
}