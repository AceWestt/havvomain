const mongoose = require('mongoose');
const { multiLangString } = require('../utils/tools');

const OthersscreenSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	productTitle: multiLangString(
		'Введите заголовок!',
		'Наша продукция',
		'Наша продукция en'
	),
	mapTitle: multiLangString(
		'Введите заголовок!',
		'География поставок',
		'География поставок en'
	),
	mapTitle: multiLangString(
		'Введите заголовок!',
		'География поставок',
		'География поставок en'
	),
	mapText: {
		top: multiLangString(
			'Введите Tекст!',
			'Мы работаем с такими странами, как:',
			'Мы работаем с такими странами, как: en'
		),
		bottom: multiLangString(
			'Введите Tекст!',
			'Россия, Германия, Кахастан, Киргизстан, Афганистан, Украина, Эквадор',
			'Россия, Германия, Кахастан, Киргизстан, Афганистан, Украина, Эквадор en'
		),
	},
	contactsText: multiLangString(
		'Введите текст!',
		'В партнёрстве с природой!',
		'В партнёрстве с природой! en'
	),
	copyright: multiLangString(
		'Введите текст!',
		'©2021 HavvoGroup. All Rights Reserved',
		'©2021 HavvoGroup. All Rights Reserved en'
	),
});

const Othersscreen = mongoose.model('Othersscreen', OthersscreenSchema);

module.exports = Othersscreen;
