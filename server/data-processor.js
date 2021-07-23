
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
		let n = ""
		try {
			n = content_cells[i].querySelectorAll('a')[1].innerHTML
		} catch (TypeError) {
			console.log("No channel for element " + i)
		}
		jsonData.push(n)
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