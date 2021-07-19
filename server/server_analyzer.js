const express = require('express')
const fs = require('fs')
const { JSDOM } = require( "jsdom" );

console.log("Starting read")
let raw_data = fs.readFileSync("data/raw.html", "utf-8")
console.log("Finished read")


console.log("Starting DOMing")
const dom = new JSDOM (raw_data)
console.log("Finished DOMing")
const app = express()
const port = 8080

content_cells = dom.window.document.querySelectorAll('.mdl-grid')
console.log(content_cells.length)
let channel_names = []

for (i = 0; i < content_cells.length; i++) {
	let n = ""
	try {
		n = content_cells[i].querySelectorAll('a')[1].innerHTML
	} catch (TypeError) {
		console.log("No channel for element " + i)
	}
	channel_names.push(n)
}

console.log(channel_names[0])

let export_string = ""
for (i = 0; i < channel_names.length; i++) {
	console.log(channel_names[i])
	export_string = export_string + channel_names[i] + "\n"
}
fs.writeFile("data/channels.csv", export_string, err => {
	if (err) {
		console.error(err)
		return
	}
})





app.get('/', (req, res) => {
//	console.log(json_data)
	res.send("Hihi")
})

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})