exports.get = [
    {
        description: "Testing a correct GET request",
        checks: (response, should) => {
            response.should.have.status(200)
		    response.body.should.be.a("array")
			response.body.should.be.empty
        }
    }
]

exports.post = [
    {
        description: "Testing an empty body on a POST request",
        body: {},
        checks: (response, should) => {
            response.should.have.status(204)
            response.body.should.be.a("object")
            response.body.should.be.empty
        }
    }, {
        description: "Testing just a job_number on a POST request",
        body: {
            "job_number": "123"
        }, checks: (response, should) => {
            response.should.have.status(206)
            response.body.should.be.a("object")
            response.body.should.have.property("errors")
            response.body.errors.should.be.equal("part_number field required")
        }
    }, {
        description: "Testing a correct POST request",
        body: {
            job_number: "12345",
            part_number: "55142",
            start_date: new Date().getTime().toString(),
            end_date: new Date().getTime().toString()
        },
        checks: (response, should) => {
            response.should.have.status(200)
            response.body.should.be.a("object")
            response.body.should.have.property("data")
            response.body.data.should.have.property("job_information")
            response.body.data.job_information.should.have.property("job_number")
        }
    }
]

exports.getI = [
    {
        description: "Testing a correct individual GET request",
        checkId: "id",
        checks: (response, should) => {
            response.should.have.status(200),
            response.body.should.be.a("object")
            response.body.should.have.property("job_information")
            response.body.job_information.should.have.property("job_number")
        }
    }
]

exports.put = [
    {
        description: "Testing a PUT request with no body",
        body: {},
        checks: (response, should) => {
            response.should.have.status(204)
            response.body.should.be.a("object")
            response.body.should.be.empty
        }
    }, {
        description: "Testing an incomplete PUT body",
        body: {
            _id: "12345",
            job_information: {
                job_number: "11352"
            }
        },
        checks: (response, should) => {
            response.should.have.status(206)
            response.body.should.be.a("object")
            response.body.should.have.property("errors")
        }
    }
]

exports.delete = [
    {
        description: "Testing a DELETE request with no id",
        checkId: "",
        checks: (response, should) => {
            response.should.have.status(404)
            response.body.should.be.a("object")
        }
    }, {
        description: "Testing a correct DELETE request",
        checkId: "id",
        checks: (response, should) => {
            response.should.have.status(200)
            response.body.should.be.a("object")
        }
    }
]