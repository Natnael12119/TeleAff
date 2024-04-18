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

module.exports = { submitProduct, upload, getProducts };
