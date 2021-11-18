const ProductCat = require('../models/ProductCat');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs/promises');
const crypto = require('crypto');

exports.getCategories = async (req, res, next) => {
	try {
		const categories = await ProductCat.find({});
		res.status(200).json({ data: categories });
	} catch (error) {
		next(error);
	}
};

exports.getCategory = async (req, res, next) => {
	try {
		const id = req.params.id;
		const cat = await ProductCat.findById(id);
		res.status(200).json({ data: cat });
	} catch (error) {
		next(error);
	}
};

exports.addCategory = async (req, res, next) => {
	try {
		const body = req.body;
		const files = req.files;

		const name = JSON.parse(body.name);
		const description = JSON.parse(body.description);
		const uploadpath = '/files/uploads/products/';
		let titleBg;
		let img;
		if (files?.titleBg) {
			titleBg = await fileUpload(
				files.titleBg,
				undefined,
				undefined,
				next,
				'category_titleBg',
				uploadpath
			);
		}

		if (files?.img) {
			img = await fileUpload(
				files.img,
				undefined,
				undefined,
				next,
				'category_img',
				uploadpath
			);
		}

		const cat = await new ProductCat({ name, description, titleBg, img });

		await cat.save((err) => {
			if (err)
				return next(
					new ErrorResponse('Could not create contactscreen assets', 500)
				);
		});

		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.updateCategory = async (req, res, next) => {
	try {
		const body = req.body;
		const id = req.params.id;
		const files = req.files;

		const cat = await ProductCat.findById(id);

		cat.name = JSON.parse(body.name);
		cat.description = JSON.parse(body.description);

		const uploadpath = '/files/uploads/products/';

		if (files?.img) {
			cat.img = await fileUpload(
				files.img,
				cat.img,
				undefined,
				next,
				'category_img',
				uploadpath
			);
		}
		if (files?.titleBg) {
			cat.titleBg = await fileUpload(
				files.titleBg,
				cat.titleBg,
				undefined,
				next,
				'category_titleBg',
				uploadpath
			);
		}

		await cat.save((err) => {
			if (err)
				return next(
					new ErrorResponse('Could not create contactscreen assets', 500)
				);
		});

		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.deleteCategory = async (req, res, next) => {
	try {
		const id = req.params.id;
		const cat = await ProductCat.findById(id);

		try {
			if (
				await ifFileExists(
					`${__clientdir}${cat.titleBg.replace(`${__uploadRoot}`, '')}`
				)
			) {
				fs.unlink(`${__clientdir}${cat.titleBg.replace(`${__uploadRoot}`, '')}`);
			}
		} catch (error) {
			return next(new ErrorResponse('internal error', 500));
		}

		try {
			if (
				await ifFileExists(
					`${__clientdir}${cat.img.replace(`${__uploadRoot}`, '')}`
				)
			) {
				fs.unlink(`${__clientdir}${cat.img.replace(`${__uploadRoot}`, '')}`);
			}
		} catch (error) {
			return next(new ErrorResponse('internal error', 500));
		}

		await cat.deleteOne({ _id: id });

		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const id = req.params.id;
		const products = await Product.find({ category_id: id });
		res.status(200).json({ data: products });
	} catch (error) {
		next(error);
	}
};

exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ data: products });
	} catch (error) {
		next(error);
	}
};

exports.getProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		res.status(200).json({ data: product });
	} catch (error) {
		next(error);
	}
};

exports.addProduct = async (req, res, next) => {
	try {
		const body = req.body;
		const category_id = req.params.id;
		const files = req.files;

		const name = JSON.parse(body.name);
		const description = JSON.parse(body.description);
		const fields = JSON.parse(body.fields);

		const uploadpath = '/files/uploads/products/';
		let imgName;

		if (files?.img) {
			imgName = await fileUpload(
				files.img,
				undefined,
				undefined,
				next,
				'product_img',
				uploadpath
			);
		}

		const product = await new Product({
			img: imgName,
			name,
			description,
			fields,
			category_id: category_id,
		});

		await product.save((err) => {
			if (err) {
				return next(new ErrorResponse('Could not create product', 500));
			}
		});

		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.updateProduct = async (req, res, next) => {
	try {
		const body = req.body;
		const id = req.params.id;
		const files = req.files;

		const product = await Product.findById(id);

		product.name = JSON.parse(body.name);
		product.description = JSON.parse(body.description);
		product.fields = JSON.parse(body.fields);

		const uploadpath = '/files/uploads/products/';

		if (files?.img) {
			product.img = await fileUpload(
				files.img,
				product.img,
				undefined,
				next,
				'product_img',
				uploadpath
			);
		}

		await product.save((err) => {
			if (err) return next(new ErrorResponse('Could not update product', 500));
		});

		res.status(200).json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);

		try {
			if (
				await ifFileExists(
					`${__clientdir}${product.img.replace(`${__uploadRoot}`, '')}`
				)
			) {
				fs.unlink(`${__clientdir}${product.img.replace(`${__uploadRoot}`, '')}`);
			}
		} catch (error) {
			return next(new ErrorResponse('internal error', 500));
		}

		await Product.deleteOne({ _id: id });

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
