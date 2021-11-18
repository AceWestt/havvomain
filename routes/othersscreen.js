const express = require('express');

const router = express.Router();

const { othersscreen, update } = require('../controllers/othersscreen');

const { protect } = require('../middleware/auth');

router.route('/').get(othersscreen);
router.route('/:id').put(protect, update);

module.exports = router;
