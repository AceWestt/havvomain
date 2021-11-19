const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
	long: {
		type: String,
		required: true,
	},
	lat: {
		type: String,
		required: true,
	},
	continent_id: {
		type: String,
	},
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
