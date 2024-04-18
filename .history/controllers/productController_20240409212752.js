const Product = require('../models/product'); // Import Product model

const submitProduct = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log request body
  
      const { productName, affiliateLink, productImage } = req.body;
  
      console.log('Product Data:', { productName, affiliateLink, productImage }); // Log product data
  
      const newProduct = await Product.create({
        productName,
        affiliateLink,
        productImage // Store the uploaded filename (if applicable)
      });
  
      console.log('Product created:', newProduct); // Log the created product
  
      res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  };
     

module.exports = { submitProduct }; // Export the fun ction as a controller action