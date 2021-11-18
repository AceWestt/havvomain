const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true,
	},
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
	fields: {
		one: {
			label: {
				ru: {
					type: String,
					required: true,
				},
				en: {
					type: String,
					required: true,
				},
			},
			value: {
				ru: {
					type: String,
					required: true,
				},
				en: {
					type: String,
					required: true,
				},
			},
		},
		two: {
			label: {
				ru: {
					type: String,
					required: true,
				},
				en: {
					type: String,
					required: true,
				},
			},
			value: {
				ru: {
					type: String,
					required: true,
				},
				en: {
					type: String,
					required: true,
				},
			},
		},
	},
	category_id: {
		type: String,
	},
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
