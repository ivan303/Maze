var fs = require('fs'),
	handlingMazes = require('./handlingMazes');

function createMazeGET(response, request) {
	console.log("Creating maze.");
	console.log("");
	// console.log(request.method);
	// console.log(request);

	// handlingMazes.addMaze();
	// console.log("value of a: " + handlingMazes.showval());


	fs.readFile('html/maze.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
};

function createMazePUT(response, request, pathname, parsedData) {
	var maze = parsedData.maze;
	var entrance = parsedData.entrance;

	// return value
	//handlingMazes.addMaze(maze, entrance);
	handlingMazes.checkMazeStructure(maze,entrance,exit);

};

function describeMaze (response, request) {};
function getExit (response, request) {};
function calculateCosts (response, request) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("quotation");
	response.end();
};
function getPath (response, request) {};

function getJS (response, request, pathname) {

	// need to extract path in another way
	path = pathname.slice(1);
	fs.readFile(path, function(err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.write(data);
		response.end();
	})
};

exports.createMazeGET = createMazeGET;
exports.createMazePUT = createMazePUT;
exports.describeMaze = describeMaze;
exports.getExit = getExit;
exports.calculateCosts = calculateCosts;
exports.getPath = getPath;

exports.getJS = getJS;