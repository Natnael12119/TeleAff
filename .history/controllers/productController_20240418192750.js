const Product = require('../models/product');
const multer = require('multer');
require('dotenv').config();
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

async function sendMessageToTelegram(product) {
	const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN; // Replace with your bot token
	const telegramChannelId = process.env.TELEGRAM_CHANNEL_ID; // Replace with your channel ID

	const messageText = `*Product Name:* ${product.productName}
	*Description:* ${product.description}
	${product.image ? `*Image:* ${product.image}` : ''}`; // Add image URL if available

	const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: telegramChannelId,
				text: messageText,
				parse_mode: 'Markdown', // Enable markdown formatting
				disable_notification: true, // Optional: disable notification for silent message
			}),
		});

		const data = await response.json();

		if (data.ok) {
			return { success: true, messageId: data.result.message_id }; // Return message ID if successful
		} else {
			console.error('Error sending message to Telegram:', data.description);
			return { success: false, error: data.description };
		}
	} catch (error) {
		console.error('Error sending message to Telegram:', error);
		return { success: false, error: 'Error sending message' };
	}
}

module.exports = {
	submitProduct,
	upload,
	getUnpublishedProducts,
	publishProduct,
	sendMessageToTelegram,
};
