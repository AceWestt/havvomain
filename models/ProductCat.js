const mongoose = require('mongoose');

const ProductCatSchema = new mongoose.Schema({
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
	description: {
		ru: {
			type: String,
			required: true,
		},
		en: {
			type: String,
			required: true,
		},
	},
	titleBg: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
});

const ProductCat = mongoose.model('Productcat', ProductCatSchema);

module.exports = ProductCat;
