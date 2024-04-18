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

const submitProduct = async (req, res) => {
	try {
		const { productName, affiliateLink, description } = req.body;
		const productImage = req.file ? req.file.filename : null;

		const newProduct = await Product.create({
			productName,
			affiliateLink,
			description,
			image: productImage,
		});

		// Redirect to productList.html
		res.redirect('/views/productList.html');
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

// Existing function definitions

module.exports = { submitProduct, upload, getUnpublishedProducts };
