// models/product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	affiliateLink: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.BLOB, // Ensure this is defined as STRING to store the filename
		allowNull: true, // or false, based on your requirement
	},
});

module.exports = Product;
