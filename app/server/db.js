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
			common: {type:String, required: true, unique: true},
			official: {type:String, required: true, unique: true},
			native: {
				common: {type:String, unique: true},
				official: {type:String, unique: true}
			}
		},
		tld: [String],
		cca2: {type:String, unique: true, indexed: true},
		ccn3: {type:String, unique: true},
		cca3: {type:String, unique: true},
		currency: [String],
		callingCode: [String],
		capital: String,
		altSpellings: [String],
		relevance: String,
		region: String,
		subregion: String,
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
	findByname: function (name, callback) {
		this.find({ name: new RegExp(name, 'i') }, callback);
	},
	findBycca2: function (cca2, callback) {
		this.find({ cca2: new RegExp(cca2, 'i') }, callback);
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
		console.log(typeof(Country[type]));
		Country[type].findBycca2(id, function (err, countries) {
			if(err){console.log(err)}
			if(countries[0] !== undefined && type === 'geo'){
				var feature = {
				    "features": [
				        {
				            "geometry": {
				                "coordinates": countries[0].coordinates,
				                "type": "MultiPolygon"
				            },
				            "id": countries[0].cca2,
				            "properties": {
				                "name": countries[0].name 
				            },
				            "type": "Feature"
				        }
				    ],
				    "type": "FeatureCollection"
				};
				countries[0] = feature;
			}
			callback(countries[0] === undefined ? {dbError:"Not found"} : countries[0]);
		});
	}
}

exports.db = dbMethods;

// dbMethods.get('visa','RU',function(err,data){
// 	console.log(data);
// })