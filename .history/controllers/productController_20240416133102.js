const Product = require('../models/product'); // Import Product model
const fs = require('fs');
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
		const { productName, affiliateLink } = req.body;
		const productImage = req.file ? req.file.filename : null; // Get image filename from req.file

		console.log('Uploaded file:', req.file); // Log the uploaded file
		console.log('Product image:', productImage); // Log the image filename

		const newProduct = await Product.create({
			productName,
			affiliateLink,
			image: productImage, // Save image filename to database
		});

		console.log('Product created:', newProduct); // Log the created product

		res.status(201).json({ message: 'Product created successfully!' });
	} catch (error) {
		console.error('Error creating product:', error.message);
		res.status(500).json({ message: 'Error creating product' });
	}
};

module.exports = { submitProduct, upload }; // Export the function and upload middleware
