const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); // Import Sequelize instance
const errorhandler = require('errorhandler');

const productController = require('./controllers/productController'); // Import controller

const app = express();
const port = process.env.PORT || 3000;

// Configure body parsing middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Error Handling Middleware
app.use(errorhandler());

// Serve static files from 'public' directory
app.use(express.static('views'));

console.log(`Serving static files from: ${express.static.path}`);


// Define route to handle product submission using the controller action
app.post('/products', productController.submitProduct);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
