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
		const product_name = req.body.productName; // Correctly access form data
		const affiliate_link = req.body.affiliateLink; // Correctly access form data
		const image = req.file ? req.file.filename : null; // Get image filename from req.file

		console.log('Uploaded file:', req.file); // Log the uploaded file
		console.log('Product image:', image); // Log the image filename

		const newProduct = await Product.create({
			product_name,
			affiliate_link,
			image, // Save image filename to database
		});

		console.log('Product created:', newProduct); // Log the created product

		res.status(201).json({ message: 'Product created successfully!' });
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ message: 'Error creating product' });
	}
};

module.exports = { submitProduct, upload }; // Export the function and upload middleware
