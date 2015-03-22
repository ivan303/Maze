var fs = require('fs');

function createMaze(response, request) {
	console.log("Creating maze.");

	fs.readFile('html/maze.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function describeMaze (response, request) {};
function getExit (response, request) {};
function calculateCosts (response, request) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("quotation");
	response.end();
};
function getPath (response, request) {};

exports.createMaze = createMaze;
exports.describeMaze = describeMaze;
exports.getExit = getExit;
exports.calculateCosts = calculateCosts;
exports.getPath = getPath;