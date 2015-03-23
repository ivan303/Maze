function route(handle, pathname, response, request, parsedData) {
	console.log("About to route a request for " + pathname);

	// function operating with regex to resolve url
	var handlerKey = resolveURL(pathname, request);

	if (typeof handle[handlerKey.path] === 'function') {
		handle[handlerKey.path](response, request, pathname);
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

	"js": /^\/js\/\S+.js$/
}

function resolveURL (pathname, request) {
	console.log("in resolveURL");
	console.log(pathname);
	console.log(urlMatcher.maze);
	switch (true) {
		case urlMatcher.maze.test(pathname): 
			console.log("route matche to maze");
			if (request.method == 'GET') {
				return { "path": "GET:/maze" };	
			} else if (request.method == 'PUT') {
				return { "path": "PUT:/maze"};
			}
			break;
		case urlMatcher.describe.test(pathname):
			console.log("route match to describe");
			break;
		case urlMatcher.exit.test(pathname):
			console.log("route match to exit");
			break;
		case urlMatcher.quotation.test(pathname):
			console.log("route match to quotation");
			break;
		case urlMatcher.path.test(pathname):
			console.log("route match to path");
			break;
		case urlMatcher.js.test(pathname):
			console.log("route match to js file");
			return { "path": "/js" }
			break;
	}
}

exports.route = route;

