const Continent = require('../models/Continent');
const Location = require('../models/Location');

exports.getContinents = async (req, res, next) => {
	try {
		const continents = await Continent.find({});
		res.status(200).json({ data: continents });
	} catch (error) {
		next(error);
	}
};

exports.getContinent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const continent = await Continent.findById(id);
		res.status(200).json({ data: continent });
	} catch (error) {
		next(error);
	}
};

exports.addContinent = async (req, res, next) => {
	try {
		const body = req.body;
		const continent = await new Continent({
			name: body.name,
			central: body.central,
		});
		await continent.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.updateContinent = async (req, res, next) => {
	try {
		const body = req.body;
		const id = req.params.id;
		const continent = await Continent.findById(id);
		continent.name = body.name;
		continent.central = body.central;
		await continent.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.deleteContinent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const continent = await Continent.findById(id);

		await continent.deleteOne({ _id: id });
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.getLocations = async (req, res, next) => {
	try {
		const id = req.params.id;
		const locations = await Location.find({ continent_id: id });
		res.status(200).json({ data: locations });
	} catch (error) {
		next(error);
	}
};

exports.getAllLocations = async (req, res, next) => {
	try {
		const locations = await Location.find({});
		res.status(200).json({ data: locations });
	} catch (error) {
		next(error);
	}
};

exports.addLocation = async (req, res, next) => {
	try {
		const id = req.params.id;
		const body = req.body;

		const location = await new Location({
			long: body.long,
			lat: body.lat,
			continent_id: id,
		});
		await location.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.editLocation = async (req, res, next) => {
	try {
		const id = req.params.id;
		const body = req.body;

		const location = await Location.findById(id);
		location.long = body.long;
		location.lat = body.lat;
		await location.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.deleteLocation = async (req, res, next) => {
	try {
		const id = req.params.id;

		const location = await Location.findById(id);

		await location.deleteOne({ _id: id });
		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};
