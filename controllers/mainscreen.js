const MainScreen = require('../models/Mainscreen');
const ErrorResponse = require('../utils/errorResponse');

exports.mainscreen = async (req, res, next) => {
	try {
		let screen = await MainScreen.findOne({ id: 777 });
		if (!screen) {
			screen = await new MainScreen({ id: 777 });
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

		const screen = await MainScreen.findById(id);
		screen.title = JSON.parse(body.title);
		screen.description = JSON.parse(body.description);
		screen.phone = body.phone;

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
