var exec = require("child_process").exec;

var handler = {
	'info': function(cca2){
		return 'info ' + cca2;
	},
	'visa': function(cca2) {
		return 'visa ' + cca2;
	},
	'geo': function(cca2) {
		return 'geo ' + cca2;

	},
	'wiki': function(cca2) {
		return 'wiki ' + cca2;

	}
}

exports.handler = handler;