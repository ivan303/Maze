var fs = require('fs'),
	handlingMazes = require('./handlingMazes');

function createMazeGET(response, request) {
	//console.log("Creating maze.");
	//console.log("");
	// console.log(request.method);
	// console.log(request);

	// handlingMazes.addMaze();

	fs.readFile('html/maze.html', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
};

function createMazePUT(response, request, options) {
	var maze = options.parsedData.maze;
	var entrance = options.parsedData.entrance;

	console.log("createMazePUT");

	// return value
	console.log(maze);
	console.log(entrance);
	

	var creatingMazeResponse = handlingMazes.addMaze(maze, entrance);

	if (typeof creatingMazeResponse === "number") { // maze properly created; maze id returned
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(String(creatingMazeResponse));
		response.end();
	} else if (typeof creatingMazeResponse === "string") { // maze not properly created; error message returned
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.write(creatingMazeResponse);
		response.end();
	}

};

function describeMaze (response, request, options) {
	var wallsAndCorridors = handlingMazes.getElementsNumbers(options.mazeId);
	var objToSend; 
	if (wallsAndCorridors.length != 0) {
		objToSend = { walls: wallsAndCorridors[0], corridors: wallsAndCorridors[1] };
		response.writeHead(200, {"Content-Type": "application/json"});
		// response.write("Number of walls: " + String(wallsAndCorridors[0]) + "\n");
		// response.write("Number of corridors: " + String(wallsAndCorridors[1]));
		response.write(JSON.stringify(objToSend));
		response.end();

	} else {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("There isn't maze of id #" + String(options.mazeId));
		response.end();
	}
};
function getExit (response, request, options) {
	var exitCoords = handlingMazes.getExitCoords(options.mazeId);
	var objToSend;
	if (exitCoords.length != 0) {
		objToSend = { exit: exitCoords };
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(objToSend));
		response.end();
	} else {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("There isn't maze of id #" + String(options.mazeId));
		response.end();
	}
};
function calculateCosts (response, request) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("quotation");
	response.end();
};
function getPath (response, request) {};

function getJS (response, request, options) {

	// need to extract path in another way
	var path = options.pathname.slice(1);
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