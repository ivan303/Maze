var http = require("http"),
	url = require("url"),
	queryString = require("querystring");

function start(route, handle) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;

		var postData = "";
		if (request.method == 'PUT') {
			request.addListener("data", function (postDataChunk) {
				postData += postDataChunk;
			});

			request.addListener("end", function () {
				var parsedData = JSON.parse(postData);
				console.log("server got data");
				route(handle, pathname, response, request, parsedData);
			});
		} else {
			route(handle, pathname, response, request);
		}
		
	};

	http.createServer(onRequest).listen(3000);
	console.log("Server has started.");
}

exports.start = start;