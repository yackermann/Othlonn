var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;		
		response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
		
		route(handle, pathname.slice(1), function(content){
			response.write(JSON.stringify(content));
			response.end();
		})
		
	}

	http.createServer(onRequest).listen(3000);
	console.log("Server has started.");
}

exports.start = start;