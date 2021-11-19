const mongoose = require('mongoose');

const ContinentSchema = new mongoose.Schema({
	name: {
		ru: {
			type: String,
			required: true,
		},
		en: {
			type: String,
			required: true,
		},
	},
	central: {
		long: {
			type: String,
			required: true,
		},
		lat: {
			type: String,
			required: true,
		},
	},
});

const Continent = mongoose.model('Continent', ContinentSchema);
module.exports = Continent;
