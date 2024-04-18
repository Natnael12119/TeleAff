const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const sequelize = require('./db');
const path = require('path');
const errorhandler = require('errorhandler');
const productController = require('./controllers/productController');
require(dotenv).config;

const app = express();
const port = process.env.PORT || 5000;

// Configure body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Synchronize the model with the database
sequelize.sync();

// Define routes
app.get('/', (req, res) => {
	res.sendFile('productForm.html', { root: 'views' });
});

app.get('/productList', (req, res) => {
	res.sendFile('productList.html', { root: 'views' });
});

app.post(
	'/products',
	productController.upload.single('productImage'),
	productController.submitProduct
);

app.get('/products', productController.getUnpublishedProducts);

app.put('/products/:id/publish', productController.publishProduct);

// Custom error-handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res
		.status(500)
		.json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// Error handler for development
if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}
