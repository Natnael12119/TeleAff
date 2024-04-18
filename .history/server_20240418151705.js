const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Product = require('./models/product');
const sequelize = require('./db');
const errorhandler = require('errorhandler');
const productController = require('./controllers/productController');

const app = express();
const port = process.env.PORT || 5000;

// Configure body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded images from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

// Routes
app.post(
	'/submit-product',
	upload.single('image'),
	productController.submitProduct
);

app.get('/get-unpublished-products', productController.getUnpublishedProducts);

app.put('/publish-product/:id', productController.publishProduct);

// Error handler
app.use(errorhandler());

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});

// Sync Sequelize models with database
sequelize.sync().then(() => {
	console.log('Database and tables created!');
});
