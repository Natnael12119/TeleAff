const express = require('express');
const bodyParser = require('body-parser');
const { Product } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

app.post('/products', async (req, res) => {
  try {
    const { productName, affiliateLink, productImage } = req.body; // Access submitted data
    const newProduct = await Product.create({
      productName,
      affiliateLink,
      productImage // Modify if storing image data directly
    });
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});