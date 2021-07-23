const express = require('express')
const dataprocessor = require('./data-processor.js')
const ejs = require('ejs')

const app = express()
const port = 8080

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(express.static('public'))

/*var data = fs.readFileSync('data/channels.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line

dict = {}

for (elt of data) {
	if (typeof(dict[elt]) != "number") {
		dict[elt] = 1
	} else {
		dict[elt]++
	}
}*/

/*for (let [key, value] of Object.entries(dict)) {
	console.log(`${key} appears ${value} times`)
}*/

app.post('/loadfile', (req, res) => {
	console.log("Received file !")
	let file = req.files.ythistory
	let json_data = dataprocessor.dataparser(file.data.toString("utf-8"))
	let dict = dataprocessor.dataextractor(json_data)

	res.render("main.ejs", {dict: dict})
})

app.get('/', (req, res) => {
	res.render("upload.ejs")
})

app.get('/favicon.ico', (req, res) => {
	res.status(204).end()
})

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})