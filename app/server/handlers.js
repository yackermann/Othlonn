var exec = require("child_process").exec;
var db = require("./db").db;

var processor = function(type, id, callback) {
	if(id !== '' && id !== undefined){
		db.get(type, id, callback);
	}else db.getAll(type, callback);
};

var handler = {
	'info': processor,
	'visa': processor,
	'geo': processor,
	'wiki': processor
};

exports.handler = handler;