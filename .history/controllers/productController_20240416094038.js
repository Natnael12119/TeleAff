const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage }).single('productImage');

const submitProduct = async (req, res) => {
	try {
		upload(req, res, async function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json({ message: err.message });
			} else if (err) {
				return res.status(500).json({ message: err.message });
			}

			const { productName, affiliateLink } = req.body;
			const productImage = req.file ? req.file.filename : null;

			// Truncate the productName to fit within 255 characters
			const truncatedProductName = productName.substring(0, 255);

			console.log('Uploaded file:', req.file);
			console.log('Product image:', productImage);

			const newProduct = await Product.create({
				productName: truncatedProductName,
				affiliateLink,
				image: productImage,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			console.log('Product created:', newProduct);

			res.status(201).json({ message: 'Product created successfully!' });
		});
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ message: 'Error creating product' });
	}
};

module.exports = { submitProduct, upload };
