const mongoose = require('mongoose');
const { multiLangString } = require('../utils/tools');

const MainscreenSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	title: multiLangString(
		'Введите заголовок главного блока!',
		'В партнёрстве с природой!',
		'В партнёрстве с природой! en'
	),
	description: multiLangString(
		'Введите описание главного блока!',
		'Наша цель — поставка свежих продуктов. \n Несмотря на то, что с момента основания компании прошло всего 2 года, мы успели завоевать доверие многих стран СНГ',
		'Наша цель — поставка свежих продуктов. \n Несмотря на то, что с момента основания компании прошло всего 2 года, мы успели завоевать доверие многих стран СНГ en'
	),
	phone: {
		type: String,
		default: '(90) 919 30 71',
		required: [true, 'Введите телефон!'],
	},
});

const Mainscreen = mongoose.model('Mainscreen', MainscreenSchema);

module.exports = Mainscreen;
