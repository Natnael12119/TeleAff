const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const sequelize = require('./db');
const path = require('path');
const errorhandler = require('errorhandler');

const productController = require('./controllers/productController');

const app = express();
const port = process.env.PORT || 5000;

// Configure body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Synchronize the model with the database
sequelize.sync();

// Routes
app.get('/', (req, res) => {
	res.sendFile('productForm.html', { root: 'views' });
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'landingPage.html'));
});

app.get('/productForm', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'productForm.html'));
});

app.get('/productList', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'productList.html'));
});

// Serve productList.html
app.get('/productList', (req, res) => {
	res.sendFile('productList.html', { root: 'views' });
});

// Define route to handle product submission using the controller action and upload middleware
app.post(
	'/products',
	productController.upload.single('productImage'),
	productController.submitProduct
);

// Define route to fetch unpublished products
app.get('/products', productController.getUnpublishedProducts);

// Define route to publish a product
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

// Error handler for development (use errorhandler only in development)
if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}
