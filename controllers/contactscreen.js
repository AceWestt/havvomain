const Contactscreen = require('../models/Contactscreen');
const ErrorResponse = require('../utils/errorResponse');

exports.contactscreen = async (req, res, next) => {
	try {
		let screen = await Contactscreen.findOne({ id: 777 });
		if (!screen) {
			screen = await new Contactscreen({ id: 777 });
			await screen.save((err) => {
				if (err) {
					return next(
						new ErrorResponse('could not create contactscreen assets', 500)
					);
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

		const screen = await Contactscreen.findById(id);
		screen.address = body.address;
		screen.phone = body.phone;
		screen.email = body.email;
		screen.worktime = body.worktime;
		screen.officeCoords = body.officeCoords;
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
