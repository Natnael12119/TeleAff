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

const submitProduct = async (req, res) => {
	try {
		const { productName, affiliateLink, description } = req.body;
		const productImage = req.file;
		const imagePath = productImage
			? `http://127.0.0.1:5000/uploads/${productImage.filename}`
			: null;

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

		// Send message to Telegram channel
		const messageResponse = await sendMessageToTelegram(product);

		if (messageResponse.success) {
			product.telegramMessageId = messageResponse.messageId;
			await product.save();

			res
				.status(200)
				.json({ message: 'Product published successfully', data: product });
		} else {
			console.error(
				'Error sending message to Telegram:',
				messageResponse.error
			);
			res.status(500).json({ message: 'Error publishing product' });
		}
	} catch (error) {
		console.error('Error publishing product:', error);
		res
			.status(500)
			.json({ message: 'Error publishing product', error: error.message });
	}
};

async function publishProduct(productId) {
	try {
		const response = await fetch(`/products/${productId}/publishToTelegram`, {
			method: 'POST',
		});

		const data = await response.json();

		if (response.status === 200) {
			// Update button text and display success message
			const publishButton = document.querySelector(
				`[onclick="publishProduct(${productId})"]`
			);
			publishButton.textContent = 'Delete';
			publishButton.onclick = null; // Remove click handler

			const successMessage = document.getElementById('successMessage');
			successMessage.textContent = data.message;
			successMessage.style.display = 'block';
		} else {
			console.error('Error publishing product:', data.message);
		}
	} catch (error) {
		console.error('Error publishing product:', error);
	}
}

module.exports = {
	submitProduct,
	upload,
	getUnpublishedProducts,
	publishProduct,
	sendToTelegram,
};
