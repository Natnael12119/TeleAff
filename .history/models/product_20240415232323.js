const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'product_name',
	},
	affiliateLink: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'affiliate_link',
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
		field: 'image',
	},
});

module.exports = Product;
