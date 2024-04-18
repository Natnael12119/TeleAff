const Product = require('../models/product');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

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

const sendToTelegram = async (req, res) => {
	try {
		const productId = req.params.id;

		const product = await Product.findByPk(productId);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		const message = `
            New Product Published:
            Name: ${product.productName}
            Description: ${product.description}
            Affiliate Link: ${product.affiliateLink}
            Image: ${product.image}
        `;

		const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
		const telegramChatId = process.env.TELEGRAM_CHAT_ID;

		await axios.post(
			`https://api.telegram.org/bot${telegramToken}/sendMessage`,
			{
				chat_id: telegramChatId,
				text: message,
				parse_mode: 'HTML',
			}
		);

		res.status(200).json({ message: 'Product sent to Telegram successfully' });
	} catch (error) {
		console.error('Error sending product to Telegram:', error);
		res.status(500).json({
			message: 'Error sending product to Telegram',
			error: error.message,
		});
	}
};

module.exports = {
	submitProduct,
	upload,
	getUnpublishedProducts,
	publishProduct,
	sendToTelegram,
};
