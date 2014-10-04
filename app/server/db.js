var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/randir');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
// 	console.log('YSY')
// });

var schemes = {
	visa: mongoose.Schema({
		cca2: {
			type:String,
			required: true,
			unique: true,
			indexed: true
		},
		cca3: String,
		ccn3: String,
		name: {
			type:String,
			required: true,
			unique: true
		},
		rank: Number,
		requirements: mongoose.Schema.Types.Mixed
	}),

	info: mongoose.Schema({
		name: {
			common: {type:String,required: true,unique: true},
			official: {type:String,required: true,unique: true},
			native: {
				common: {type:String,required: true,unique: true},
				official: {type:String,required: true,unique: true}
			}
		},
		tld: [String],
		cca2: {type:String, required: true,unique: true, indexed: true},
		ccn3: {type:String, required: true, unique: true},
		cca3: {type:String, required: true, unique: true},
		currency: [String],
		callingCode: [String],
		capital: {type:String, required: true},
		altSpellings: [String],
		relevance: String,
		region: {type:String,required: true},
		subregion: {type:String,required: true},
		nativeLanguage: String,
		languages: mongoose.Schema.Types.Mixed,
		translations: mongoose.Schema.Types.Mixed,
		latlng: [Number],
		demonym: String,
		borders: [String],
		area: Number
	}),

	geo: mongoose.Schema({
		coordinates: [mongoose.Schema.Types.Mixed],
		cca2: {type:String, required: true, unique: true, indexed: true},
		name: {type:String, required: true, unique: true}
	}),

	wiki: mongoose.Schema({
		name: {type:String, required: true},
		cca2: {type:String, required: true, unique: true, indexed: true},
		info: {type:String, required: true},
	})
}
// 	set: Data.prototype.saltySha1 // some function called before saving the data
var searchMethods = {
	findByname: function (name, cb) {
		this.find({ name: new RegExp(name, 'i') }, cb);
	},
	findBycca2: function (cca2, cb) {
		this.find({ name: new RegExp(cca2, 'i') }, cb);
	}
}

schemes.visa.statics = searchMethods;
schemes.info.statics = searchMethods;
schemes.geo.statics = searchMethods;
schemes.wiki.statics = searchMethods;

var Country = {
	visa: mongoose.model('visa', schemes.visa),
	info: mongoose.model('info', schemes.info),
	geo: mongoose.model('geo', schemes.geo),
	wiki: mongoose.model('wiki', schemes.wiki)
}

var dbMethods = {
	add: function(type, item){
		var kitty = new Country[type](item);
		kitty.save(function (err, saved) {
			if (err) return console.error(err);
		});
	},
	get: function(type, id, callback){
		Country[type].findBycca2(id, function (err, countries) {
			callback(countries[0]);
		});
	}
}

exports.db = dbMethods;
