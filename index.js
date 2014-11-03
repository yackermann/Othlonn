var server = require("./server/server");
var router = require("./server/router");
var requestHandlers = require("./server/handlers");

var handle = requestHandlers.handler;

server.start(router.route, handle);