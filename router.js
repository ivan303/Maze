var url = require('url');
function route(handle, pathname, response, request, parsedData) {
	console.log("About to route a request for " + pathname);

	// function operating with regex to resolve url
	var handlerKey = resolveURL(pathname, request);

	if (handlerKey != undefined && typeof handle[handlerKey.path] === 'function') {
		handle[handlerKey.path](response, request, { pathname: pathname, parsedData: parsedData, mazeId: handlerKey.id, params: handlerKey.params });
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found.");
		response.end();
	}
}

var urlMatcher = {
	"maze": /^\/maze\/?$/,
	"describe": /^\/maze\/[0-9]+\/describe\/?$/,
	"exit": /^\/maze\/[0-9]+\/exit\/?$/,
	"quotation": /^\/maze\/[0-9]+\/quotation\/?$/,
	"path": /^\/maze\/[0-9]+\/path\/?$/,

	"js": /^\S*\/js\/\S+.js$/,
	"css": /^\S*\/css\/\S+.css$/,
	"favicon": /^\S*\/favicon.ico$/
}

function resolveURL (pathname, request) {
	switch (true) {
		case urlMatcher.maze.test(pathname): 
			if (request.method == 'GET') {
				return { "path": "GET:/maze" };	
			} else if (request.method == 'PUT') {
				return { "path": "PUT:/maze"};
			}
			break;
		case urlMatcher.describe.test(pathname):
			var id = parseInt(pathname.match(/[0-9]+/)[0]);
			return { "path": "/maze/id/describe", "id": id };
			break;
		case urlMatcher.exit.test(pathname):
			var id = parseInt(pathname.match(/[0-9]+/)[0]);
			return { "path": "/maze/id/exit", "id": id };
			break;
		case urlMatcher.quotation.test(pathname):
			var id = parseInt(pathname.match(/[0-9]+/)[0]);
			var params = url.parse(request.url, true).query;
			return { "path": "/maze/id/quotation", "id": id, "params": params };
			break;
		case urlMatcher.path.test(pathname):
			var id = parseInt(pathname.match(/[0-9]+/)[0]);
			return { "path": "/maze/id/path", "id": id };
			break;
		case urlMatcher.js.test(pathname):
			return { "path": "/js" }
			break;
		case urlMatcher.css.test(pathname):
			return { "path": "/css" }
			break;
		case urlMatcher.favicon.test(pathname):
			return { "path": "/favicon.ico"}
			break;
	}
}

exports.route = route;

