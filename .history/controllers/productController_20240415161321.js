const Product = require('../models/product');
const multer = require('multer');
const path = require('path');
const Telegrambot = require('node-telegram-bot-api');

const bot = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const telegramBot = new Telegrambot(bot);

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
		const productImage = req.file ? req.file.filename : null;

		const newProduct = await Product.create({
			productName,
			affiliateLink,
			image: productImage,
			status: 'pending',
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

const getProducts = async (req, res) => {
	try {
		const products = await Product.findAll();
		res.status(200).json({ data: products });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching data', error: error.message });
	}
};

const publishProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findByPk(productId);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		const message = `
          New Product:
          Name: ${product.productName}
          Affiliate Link: ${product.affiliateLink}
      `;

		const sentMessage = await bot.sendMessage(chatId, message);

		// Update product status to published and store the telegram message ID
		await product.update({
			status: 'published',
			telegramMessageId: sentMessage.message_id,
		});

		res.status(200).json({ message: 'Product published successfully' });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error publishing product', error: error.message });
	}
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await bot.deleteMessage(chatId, product.telegramMessageId); // Delete message from Telegram

        await product.destroy(); // Delete product from database

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = { submitProduct, upload, getProducts };
