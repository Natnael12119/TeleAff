const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'product_name', // Ensure the field name matches the actual column name in the database
	},
	affiliateLink: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'affiliate_link', // Ensure the field name matches the actual column name in the database
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true, // or false, based on your requirement
		field: 'image', // Ensure the field name matches the actual column name in the database
	},
});

module.exports = Product;
