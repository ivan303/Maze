var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");

var handle = {};
handle["/maze"] = requestHandlers.createMaze;
handle["/maze/id/describe"] = requestHandlers.describeMaze;
handle["/maze/id/exit"] = requestHandlers.getExit;
handle["/maze/id/quotation"] = requestHandlers.calculateCosts;
handle["maze/id/path"] = requestHandlers.getPath;

server.start(router.route, handle);
