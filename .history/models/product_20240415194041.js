const { Sequelize, DataTypes } = require('sequelize');
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
	},
	affiliateLink: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	status: {
		type: DataTypes.ENUM('pending', 'published'),
		defaultValue: 'pending',
	},
	telegramMessageId: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});

module.exports = Product;
