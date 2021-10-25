
const fs = require('fs')
const { JSDOM } = require( "jsdom" );

function dataloader (filename) {
	const strDom = fs.readFileSync(filename, "utf-8")
	return new JSDOM (strDom)
}

function dataparser (domText) {

	let dom = new JSDOM (domText)

	let jsonData = []
	let content_cells = dom.window.document.querySelectorAll('.mdl-grid')

	for (i = 0; i < content_cells.length; i++) {
		let channelName = ""
		let videoId = ""
		let watchDate = ""

		try {
			channelName = content_cells[i].querySelectorAll('a')[1].innerHTML
		} catch (TypeError) {
			//console.log("No channel for element " + i)
		}

		try {
			videoId = content_cells[i].querySelectorAll('a')[0].getAttribute('href').split('=')[1]
		} catch (TypeError) {
			//console.log("No video for element " + i)
		}

		try {
			watchDate = content_cells[i].lastChild.innerHTML
			console.log(watchDate)
		} catch (TypeError) {
			console.log("No watch date for element " + i)
		}

		jsonData.push(channelName)
	}

	return jsonData
}

function dataextractor (jsonData) {
	let dict = {}

	for (elt of jsonData) {
		if (typeof(dict[elt]) != "number") {
			dict[elt] = 1
		} else {
			dict[elt]++
		}
	}
	return dict
}



module.exports = {
	dataloader: dataloader,
	dataparser: dataparser,
	dataextractor: dataextractor
}