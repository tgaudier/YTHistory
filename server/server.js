const express = require('express')
const dataprocessor = require('./data-processor.js')
const ejs = require('ejs')

// const api_key = require('./private/api-key.js')

const app = express()
const port = 8080

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(express.static('public'))


app.post('/loadfile', (req, res) => {
	console.log("Received file !")
	let file = req.files.ythistory
	let json_data = dataprocessor.dataloader(file.data.toString("utf-8"))
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
