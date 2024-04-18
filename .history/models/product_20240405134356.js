const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  affiliateLink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productImage: {
    type: Sequelize.STRING, // Adjust if storing image data directly
    allowNull: false
  }
});

module.exports = Product;