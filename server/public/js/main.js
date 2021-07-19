window.onload = function () {

	dlist = Object.entries(data)

	let tr =  d3.select("tbody")
				.selectAll("tr")
	  			.data(dlist)
	  			.enter()
	  			.append("tr")

	let td =  tr.selectAll("td")
				.data(function(d, i) { return Object.values(d) })
				.enter()
				.append("td")
				.text(function (d) { return d })


	tr.sort((a, b) => {return d3.ascending(b[1], a[1]) })



}