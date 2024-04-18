const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

const getUnpublishedProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			where: {
				published: false,
			},
		});

		res
			.status(200)
			.json({ message: 'Successfully fetched products', data: products });
	} catch (error) {
		console.error('Error fetching products:', error);
		res
			.status(500)
			.json({ message: 'Error fetching products', error: error.message });
	}
};

const submitProduct = async (req, res) => {
	try {
		const { productName, description, affiliateLink } = req.body;
		const productImage = req.file ? req.file.filename : null;

		console.log('Received Data:', {
			productName,
			description,
			affiliateLink,
			productImage,
		}); // Log received data

		const newProduct = await Product.create({
			productName,
			description, // Add this line for description
			affiliateLink,
			image: productImage,
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

module.exports = { submitProduct, upload, getUnpublishedProducts };
