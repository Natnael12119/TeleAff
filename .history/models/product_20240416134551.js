const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	productName: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	affiliateLink: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING, // Ensure this is defined as STRING to store the filename
		allowNull: true, // or false, based on your requirement
	},
});

module.exports = Product;
