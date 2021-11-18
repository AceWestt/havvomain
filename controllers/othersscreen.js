const Othersscreen = require('../models/Othersscreen');
const ErrorResponse = require('../utils/errorResponse');

exports.othersscreen = async (req, res, next) => {
	try {
		let screen = await Othersscreen.findOne({ id: 777 });
		if (!screen) {
			screen = await new Othersscreen({ id: 777 });
			await screen.save((err) => {
				if (err) {
					return next(new ErrorResponse('could not create mainblock assets', 500));
				}
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

		const screen = await Othersscreen.findById(id);
		screen.productTitle = JSON.parse(body.productTitle);
		screen.mapTitle = JSON.parse(body.mapTitle);
		screen.mapText = JSON.parse(body.mapText);
		screen.contactsText = JSON.parse(body.contactsText);
		screen.copyright = JSON.parse(body.copyright);

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
