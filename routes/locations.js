const express = require('express');

const router = express.Router();

const {
	getContinents,
	getContinent,
	addContinent,
	updateContinent,
	deleteContinent,
	getLocations,
	getAllLocations,
	addLocation,
	editLocation,
	deleteLocation,
} = require('../controllers/coordinates');

const { protect } = require('../middleware/auth');

router.route('/continents').get(getContinents);
router.route('/continents/:id').get(getContinent);
router.route('/continents').post(protect, addContinent);
router.route('/continents/:id').put(protect, updateContinent);
router.route('/continents/:id').delete(protect, deleteContinent);

router.route('/locations/:id').get(getLocations);
router.route('/locations').get(getAllLocations);
router.route('/locations/:id').post(protect, addLocation);
router.route('/locations/:id').put(protect, editLocation);
router.route('/locations/:id').delete(protect, deleteLocation);

module.exports = router;
