
const fs = require('fs')

function dataloader (str_data) {
	const jsonData = JSON.parse(str_data)
	let elts = []
	
	for (elt of jsonData) {
		elts.push(elt.titleUrl)
	}
	return elts
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
	dataextractor: dataextractor
}
