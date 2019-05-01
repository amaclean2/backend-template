var shell = require("shelljs")

// Warns if an argument isn't passed
if(!process.argv[2]) {
	console.log('\x1b[31m%s\x1b[0m', 'An argument is required')
	return 1
}

const newApiName = process.argv[2]

// Warns if a name isn't plural
if(newApiName[newApiName.length - 1] !== 's') {
    console.log('\x1b[31m%s\x1b[0m', 'Name must be plural')
    return 1
}

// Defines singular name
const newApiSingular = newApiName.substr(0, newApiName.length - 1)

// Creats new directories if needed
if (!shell.test("-d", "./test")) {
	shell.mkdir("test")
}

if (!shell.test("-d", "./test/useCases")) {
	shell.mkdir("test/useCases")
}

if (!shell.test("-d", "./validators")) {
	shell.mkdir("validators")
}

if (!shell.test("-d", "./sanitizers")) {
	shell.mkdir("sanitizers")
}


// Creates new files for the new API //


// Create new controller file
shell.cp("./templates/controllerTemplate.js", `./controllers/${newApiName}.js`)

// Replace text in controller file
shell.sed("-i", "API_NAME", newApiName, `./controllers/${newApiName}.js`)

// Replace instances of singular words in controller file
shell.sed("-i", "API_SINGULAR", newApiSingular, `./controllers/${newApiName}.js`)


// Create new test file
shell.cp("./templates/testTemplate.js", `./test/${newApiName}.js`)

// Replace text in test file
shell.sed("-i", "API_NAME", newApiName, `./test/${newApiName}.js`)


// Create new test case file
shell.cp("./templates/useCaseTemplate.js", `./test/useCases/${newApiName}.js`)

// Create new validator file
shell.cp("./templates/validatorTemplate.js", `./validators/${newApiName}.js`)

// Create new sanitizer file
shell.cp("./templates/sanitizerTemplate.js", `./sanitizers/${newApiName}.js`)

//


// Adds the new API file to ./controllers/index.js 
shell
	.echo(`const ${newApiName} = require("./${newApiName}")`)
	.cat("./controllers/index.js")
	.to("./controllers/index.js")

shell.sed("-i", "}", `\t${newApiName}.set(app)\n}`, "./controllers/index.js");