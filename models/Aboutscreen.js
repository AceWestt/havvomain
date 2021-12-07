const mongoose = require('mongoose');
const { multiLangString, img } = require('../utils/tools');

const AboutScreenSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	blockTitle: multiLangString('Введите заголовок!', 'О нас', 'О нас uz'),
	title: multiLangString(
		'Введите заголовок!',
		'Havvo Group - это молодой и динамично развивающийся агрохолдинг, созданный в 2019г.',
		'Havvo Group - это молодой и динамично развивающийся агрохолдинг, созданный в 2019г. uz'
	),
	text: multiLangString(
		'Введтие текс!',
		`Включает в себя группу компаний:
    ООО “Havvo Group”, ООО “Havvo Agro Food”, ООО “Havvo Trust”, ООО “Havvo Noble” СНГ
    Основной деятельностью нашего агрохолдинга является экспорт и импорт сезонной сельскохозяйственной продукции, сухофруктов и орехов. 
    Численность сотрудников составляет – 20 человек, каждый из которых является высококвалифицированным и компетентным профессионалом в своей отрасли.
    Ежегодный экспортный оборот холдинга составляет около 30 млн. долларов США, оборот по импорту – около 10 млн. долларов США.`,
		`Включает в себя группу компаний:
    ООО “Havvo Group”, ООО “Havvo Agro Food”, ООО “Havvo Trust”, ООО “Havvo Noble” СНГ
    Основной деятельностью нашего агрохолдинга является экспорт и импорт сезонной сельскохозяйственной продукции, сухофруктов и орехов. 
    Численность сотрудников составляет – 20 человек, каждый из которых является высококвалифицированным и компетентным профессионалом в своей отрасли.
    Ежегодный экспортный оборот холдинга составляет около 30 млн. долларов США, оборот по импорту – около 10 млн. долларов США. uz`
	),
	logoCard: img('/files/defaults/about/logocard.svg'),
	workerCard: {
		number: { type: Number, required: true, default: 20 },
		text: multiLangString(
			'Workercard text needed',
			'Сотрудников в штате компании',
			'Сотрудников в штате компании uz'
		),
	},
	firstImgCard: img('/files/defaults/about/about_card_img_1.png'),
	realProduct: {
		number: { type: Number, required: true, default: 195 },
		text: multiLangString(
			'Realized product card text needed',
			'Тонн реализованной продукции',
			'Тонн реализованной продукции uz'
		),
	},
	secondImgCard: img('/files/defaults/about/about_card_img_2.png'),
	marketYear: {
		number: { type: Number, required: true, default: 2 },
		text: multiLangString(
			'Years in market card text needed',
			'Года на рынке',
			'Года на рынке uz'
		),
	},
	firstPoint: {
		color: { type: String, required: true, default: '#00ccff' },
		icon: img('/files/defaults/about/about_point_proffessionals_icn.svg'),
		text: multiLangString(
			'First point text needed',
			'Являемся специалистами экспортно-импортных операций',
			'Являемся специалистами экспортно-импортных операций uz'
		),
	},
	secondPoint: {
		color: { type: String, required: true, default: '#ffab07' },
		icon: img('/files/defaults/about/about_point_safe_icn.svg'),
		text: multiLangString(
			'Second point text needed',
			'Безопасная упаковка',
			'Безопасная упаковка uz'
		),
	},
	thirdPoint: {
		color: { type: String, required: true, default: '#0ecf21' },
		icon: img('/files/defaults/about/about_point_quality_icn.svg'),
		text: multiLangString(
			'Third point text needed',
			'Высшее качество',
			'Высшее качество uz'
		),
	},
	fourthPoint: {
		color: { type: String, required: true, default: '#0ecf21' },
		icon: img('/files/defaults/about/about_point_quality_icn.svg'),
		text: multiLangString(
			'Fourth point text needed',
			'Высшее качество',
			'Высшее качество uz'
		),
	},
	fifthPoint: {
		color: { type: String, required: true, default: '#0ecf21' },
		icon: img('/files/defaults/about/about_point_quality_icn.svg'),
		text: multiLangString(
			'Fifth point text needed',
			'Высшее качество',
			'Высшее качество uz'
		),
	},
});

const AboutScreen = mongoose.model('Aboutscreen', AboutScreenSchema);

module.exports = AboutScreen;
