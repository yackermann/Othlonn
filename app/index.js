var server = require("./server/server");
var router = require("./server/router");
var requestHandlers = require("./server/handlers");
var db = require("./server/db").db;

db.get('visa', 'ab', function(country){
	console.log(country)
});

var handle = requestHandlers.handler;

server.start(router.route, handle);