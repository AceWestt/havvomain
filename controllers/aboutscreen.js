const AboutScreen = require('../models/Aboutscreen');
const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs/promises');
const crypto = require('crypto');

exports.aboutscreen = async (req, res, next) => {
	try {
		let screen = await AboutScreen.findOne({ id: 777 });
		if (!screen) {
			screen = await new AboutScreen({ id: 777 });
			await screen.save((err) => {
				if (err)
					return next(new ErrorResponse('Could not create aboutscreen assets', 500));
			});
		}
		res.status(200).json({ data: screen });
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		const id = req.params.id;
		const body = req.body;
		const files = req.files;

		const screen = await AboutScreen.findById(id);
		screen.blockTitle = JSON.parse(body.blockTitle);
		screen.title = JSON.parse(body.title);
		screen.text = JSON.parse(body.text);
		screen.workerCard = JSON.parse(body.workerCard);
		screen.realProduct = JSON.parse(body.realProduct);
		screen.marketYear = JSON.parse(body.marketYear);
		screen.firstPoint.text = JSON.parse(body.firstPoint).text;
		screen.firstPoint.color = JSON.parse(body.firstPoint).color;
		screen.secondPoint.text = JSON.parse(body.secondPoint).text;
		screen.secondPoint.color = JSON.parse(body.secondPoint).color;
		screen.thirdPoint.text = JSON.parse(body.thirdPoint).text;
		screen.thirdPoint.color = JSON.parse(body.thirdPoint).color;
		screen.fourthPoint.text = JSON.parse(body.fourthPoint).text;
		screen.fourthPoint.color = JSON.parse(body.fourthPoint).color;
		screen.fifthPoint.text = JSON.parse(body.fifthPoint).text;
		screen.fifthPoint.color = JSON.parse(body.fifthPoint).color;

		const uploadpath = '/files/uploads/aboutscreen/';

		if (files?.logoCard) {
			screen.logoCard = await fileUpload(
				files.logoCard,
				screen.logoCard,
				'/files/defaults/about/logocard.svg',
				next,
				'logo-card',
				uploadpath
			);
		}
		if (files?.firstImgCard) {
			screen.firstImgCard = await fileUpload(
				files.firstImgCard,
				screen.firstImgCard,
				'/files/defaults/about/about_card_img_1.png',
				next,
				'firstImgCard',
				uploadpath
			);
		}

		if (files?.secondImgCard) {
			screen.secondImgCard = await fileUpload(
				files.secondImgCard,
				screen.secondImgCard,
				'/files/defaults/about/about_card_img_2.png',
				next,
				'secondImgCard',
				uploadpath
			);
		}

		if (files?.firstPointIcon) {
			screen.firstPoint.icon = await fileUpload(
				files.firstPointIcon,
				screen.firstPoint.icon,
				'/files/defaults/about/about_point_proffessionals_icn.svg',
				next,
				'firstPointIcon',
				uploadpath
			);
		}

		if (files?.secondPointIcon) {
			screen.secondPoint.icon = await fileUpload(
				files.secondPointIcon,
				screen.secondPoint.icon,
				'/files/defaults/about/about_point_safe_icn.svg',
				next,
				'secondPointIcon',
				uploadpath
			);
		}

		if (files?.thirdPointIcon) {
			screen.thirdPoint.icon = await fileUpload(
				files.thirdPointIcon,
				screen.thirdPoint.icon,
				'/files/defaults/about/about_point_quality_icn.svg',
				next,
				'thirdPointIcon',
				uploadpath
			);
		}

		if (files?.fourthPointIcon) {
			screen.fourthPoint.icon = await fileUpload(
				files.fourthPointIcon,
				screen.fourthPoint.icon,
				'/files/defaults/about/about_point_quality_icn.svg',
				next,
				'fourthPointIcon',
				uploadpath
			);
		}

		if (files?.fifthPointIcon) {
			screen.fifthPoint.icon = await fileUpload(
				files.fifthPointIcon,
				screen.fifthPoint.icon,
				'/files/defaults/about/about_point_quality_icn.svg',
				next,
				'fifthPointIcon',
				uploadpath
			);
		}

		await screen.save((err) => {
			if (err) {
				return next(new ErrorResponse('something went wrong on save'));
			}
		});
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

const fileUpload = async (
	file,
	currentFile,
	defaultFile,
	next,
	mainName,
	movePath
) => {
	const new_img = file;
	const old_img = currentFile;
	if (old_img !== defaultFile) {
		try {
			if (
				await ifFileExists(
					`${__clientdir}${old_img.replace(`${__uploadRoot}`, '')}`
				)
			) {
				fs.unlink(`${__clientdir}${old_img.replace(`${__uploadRoot}`, '')}`);
			}
		} catch (error) {
			return next(new ErrorResponse('internal error', 500));
		}
	}
	let ext = new_img.name.split('.');
	ext = ext[ext.length - 1];
	const file_name = `${crypto
		.randomBytes(10)
		.toString('hex')}-${mainName}-${new Date().getTime().toString()}.${ext}`;
	new_img.mv(`${__clientdir}${movePath}${file_name}`, (err) => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(err, 500));
		}
	});

	return `${__uploadRoot}${movePath}${file_name}`;
};

const ifFileExists = async (path) => {
	try {
		await fs.access(path);
		return true;
	} catch (error) {
		return false;
	}
};
