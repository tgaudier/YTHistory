const express = require('express')
const fs = require('fs')
const ejs = require('ejs')

const app = express()
const port = 8080

app.use(express.static('public'))

var data = fs.readFileSync('data/channels.csv')
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
}

/*for (let [key, value] of Object.entries(dict)) {
	console.log(`${key} appears ${value} times`)
}*/

app.get('/', (req, res) => {
//	console.log(json_data)
	res.render("main.ejs", {channels: dict})
})

app.get('/favicon.ico', (req, res) => {
	res.status(204).end()
})

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})