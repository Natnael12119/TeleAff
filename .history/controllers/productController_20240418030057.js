const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const sotorage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'uploads/');
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + '_' + file.originalname);
		},
	}),
});

const upload = multer({ storage: storage });

const submitProduct = async (req, res) => {
	try {
		const { productName, affiliateLink, description } = req.body;
		const productImage = req.file ? req.file.filename : null;

		const newProduct = await Product.create({
			productName,
			affiliateLink,
			description,
			image: productImage
				? `http://127.0.0.1:5000/uploads/${productImage}`
				: null,
		});

		// Send a JSON response to the user
		res
			.status(201)
			.json({ message: 'Data is successfully saved', data: newProduct });
	} catch (error) {
		// Send a JSON response to the user
		res
			.status(500)
			.json({ message: 'Error saving data', error: error.message });
	}
};

// Function to fetch unpublished products
const getUnpublishedProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			where: { published: false },
			attributes: ['id', 'productName', 'description'],
		});

		res.status(200).json({ data: products });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching products', error: error.message });
	}
};

const publishProduct = async (req, res) => {
	try {
		const productId = req.params.id;

		const product = await Product.findByPk(productId);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		product.published = true;
		await product.save();

		res
			.status(200)
			.json({ message: 'Product published successfully', data: product });
	} catch (error) {
		console.error('Error publishing product:', error);
		res
			.status(500)
			.json({ message: 'Error publishing product', error: error.message });
	}
};

module.exports = {
	submitProduct,
	upload,
	getUnpublishedProducts,
	publishProduct,
};
