const express = require('express');

const router = express.Router();

const {
	getCategories,
	getCategory,
	addCategory,
	updateCategory,
	deleteCategory,
	getProducts,
	getAllProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productcontroller');

const { protect } = require('../middleware/auth');

router.route('/cats').get(getCategories);
router.route('/cats/:id').get(getCategory);
router.route('/cats').post(protect, addCategory);
router.route('/cats/:id').put(protect, updateCategory);
router.route('/cats/:id').delete(protect, deleteCategory);

router.route('/products/:id').get(getProducts);
router.route('/products').get(getAllProducts);
router.route('/products/product/:id').get(getProduct);
router.route('/products/:id').post(protect, addProduct);
router.route('/products/:id').put(protect, updateProduct);
router.route('/products/:id').delete(protect, deleteProduct);

module.exports = router;
