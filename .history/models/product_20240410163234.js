const Sequelize = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'product_name'
  },
  affiliateLink: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'affiliate_link'
  },
  image: {
    type: Sequelize.STRING,
    field: 'image'
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;