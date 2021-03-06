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
            response.should.have.status(206)
            response.body.should.be.a("object")
            response.body.should.be.empty
        }
    }, {
        description: "Testing just a single field on a POST request",
        body: {
            id: "123"
        }, checks: (response, should) => {
            response.should.have.status(206)
            response.body.should.be.a("object")
            response.body.should.have.property("errors")
        }
    }, {
        description: "Testing a correct POST request",
        body: {
            /*
                Enter the information for a correct body
            */
        },
        checks: (response, should) => {
            response.should.have.status(200)
            response.body.should.be.a("object")
            response.body.should.have.property("data")
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
        }
    }
]

exports.put = [
    {
        description: "Testing a PUT request with no body",
        body: {},
        checks: (response, should) => {
            response.should.have.status(206)
            response.body.should.be.a("object")
            response.body.should.be.empty
        }
    }, {
        description: "Testing an incomplete PUT body",
        body: {
            id: "12345"
            /*
                Enter the correct information for a put body
            */
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