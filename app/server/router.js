function route(handle, pathname, callback) {
	console.log("About to route a request for " + pathname);
	var requestpath = pathname.split('/');
	// console.log(requestpath)
	if (typeof handle[requestpath[0]] === 'function' && requestpath[1] !== undefined && requestpath[1] !== '') {
		return handle[requestpath[0]](requestpath[1], callback);
	} else {
		console.log("No request handler found for " + pathname + "\n");
		callback({error:404});
	}
}

exports.route = route;