const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'product_name', // Use the correct column name
	},
	affiliateLink: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'affiliate_link', // Use the correct column name
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'createdAt',
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'updatedAt',
	},
});

module.exports = Product;
