const mongoose = require('mongoose');
const { multiLangString } = require('../utils/tools');

const ContactscreenSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	address: multiLangString(
		'Введите текст',
		'Узбекистан, г. Ташкент\nулица Юнусабад, д. 9',
		'Узбекистан, г. Ташкент\nулица Юнусабад, д. 9 en'
	),
	phone: multiLangString('Введите текст', '(97) 446 40 10', '(97) 446 40 10 en'),
	email: multiLangString(
		'Введите текст',
		'timur.rakhmatullaev@havvogroup.uz',
		'timur.rakhmatullaev@havvogroup.uz en'
	),
	worktime: multiLangString(
		'Введите текст',
		'Пн - Пт с 9:00 до 18:00\nСб - Вс выходной',
		'Пн - Пт с 9:00 до 18:00\nСб - Вс выходной en'
	),
	officeCoords: {
		long: {
			type: String,
			required: true,
			default: '41.3775',
		},
		lat: {
			type: String,
			required: true,
			default: '64.5853',
		},
	},
});

const Contactscreen = mongoose.model('Contactscreen', ContactscreenSchema);

module.exports = Contactscreen;
