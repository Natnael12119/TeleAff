const express = require('express');
const bodyParser = require('body-parser');
const formBody = require('body/form');

const sequelize = require('./db'); // Import Sequelize instance
const path = require('path'); // Import path module
const errorhandler = require('errorhandler');

const productController = require('./controllers/productController'); // Import controller

const app = express();
const port = process.env.PORT || 5000;

// Configure body parsing middleware to handle form data
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Serve static files from 'public' directoryrs
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile('productForm.html', { root: 'views' });
});

// Define route to handle product submission using the controller action
// app.post('/products', productController.submitProduct);
app.post('/products', async (req, res) => { 
  const body = yield formBody(req, res);
   console.log('body',body)
   res.send('ok')
});

// Custom error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Error handler for development (use errorhandler only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}