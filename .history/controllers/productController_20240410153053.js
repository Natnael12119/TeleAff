const Product = require('../models/product'); // Import Product model
const multer = require('multer');
const path = require('path');



const submitProduct = async (req, res) => {
    try {
      const { productName, affiliateLink, productImage } = req.body;
  
      const newProduct = await Product.create({
        productName,
        affiliateLink,
        productImage // Store the uploaded filename (if applicable)
      });
  
      console.log('Product created:', newProduct); // Log the created product
  
      res.status(201).json({ message: 'Product created successfully!' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  };  

module.exports = { submitProduct }; // Export the function as a controller action