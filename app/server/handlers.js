var exec = require("child_process").exec;
var db = require("./db").db;


var handler = {
	'info': function(cca2, callback){
		db.get('info', cca2, callback);
	},
	'visa': function(cca2, callback) {
		db.get('visa', cca2, callback);
	},
	'geo': function(cca2, callback) {
		db.get('geo', cca2, callback);

	},
	'wiki': function(cca2, callback) {
		db.get('wiki', cca2, callback);
	}
}

exports.handler = handler;