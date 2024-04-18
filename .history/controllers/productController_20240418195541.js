const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });

// Function to handle product submission
const submitProduct = async (req, res) => {
	try {
		// Destructure product data from request body
		const { productName, affiliateLink, description } = req.body;
		const productImage = req.file;

		// Construct image URL
		const imagePath = productImage
			? `http://127.0.0.1:5000/uploads/${productImage.filename}`
			: null;

		// Create new product in the database
		const newProduct = await Product.create({
			productName,
			affiliateLink,
			description,
			image: imagePath,
			imageName: productImage ? productImage.filename : null,
			imagePath: productImage ? productImage.path : null,
			imageMimetype: productImage ? productImage.mimetype : null,
			imageSize: productImage ? productImage.size : null,
		});

		// Send a JSON response to the user
		res
			.status(201)
			.json({ message: 'Data is successfully saved', data: newProduct });
	} catch (error) {
		// Send a JSON response in case of error
		res
			.status(500)
			.json({ message: 'Error saving data', error: error.message });
	}
};

// Function to fetch unpublished products from the database
const getUnpublishedProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			where: { published: false },
			attributes: [
				'id',
				'productName',
				'description',
				'image',
				'imageName',
				'imagePath',
				'imageMimetype',
				'imageSize',
			],
		});

		// Send the fetched products as JSON response
		res.status(200).json({ data: products });
	} catch (error) {
		// Send a JSON response in case of error
		res
			.status(500)
			.json({ message: 'Error fetching products', error: error.message });
	}
};

// Function to publish a product
const publishProduct = async (req, res) => {
	try {
		const productId = req.params.id;

		// Find the product by ID
		const product = await Product.findByPk(productId);

		// If product not found, return 404 status
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// Update the product's published status and save
		product.published = true;
		await product.save();

		// Send a JSON response to the user
		res
			.status(200)
			.json({ message: 'Product published successfully', data: product });
	} catch (error) {
		// Send a JSON response in case of error
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
