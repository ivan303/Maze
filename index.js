var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");

var handle = {};
handle["GET:/maze"] = requestHandlers.createMazeGET;
handle["PUT:/maze"] = requestHandlers.createMazePUT;
handle["/maze/id/describe"] = requestHandlers.describeMaze;
handle["/maze/id/exit"] = requestHandlers.getExit;
handle["/maze/id/quotation"] = requestHandlers.calculateCosts;
handle["/maze/id/path"] = requestHandlers.getPath;
handle["/js"] = requestHandlers.getJS;
handle["/css"] = requestHandlers.getCSS;
handle["/favicon.ico"] = requestHandlers.getFavicon;


server.start(router.route, handle);
