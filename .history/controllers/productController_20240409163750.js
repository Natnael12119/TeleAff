const Product = require('../models/Product'); // Import Product model

const submitProduct = async (req, res) => {
  try {
    const { productName, affiliateLink, productImage } = req.body;

    const newProduct = await Product.create({
      productName,
      affiliateLink,
      productImage // Store the uploaded filename (if applicable)
    });

    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

module.exports = { submitProduct }; // Export the function as a controller action
