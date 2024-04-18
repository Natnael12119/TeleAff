const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Corrected path

const Product = sequelize.define(
	'Product',
	{
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
			// Corrected the casing to match the database
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'pending',
		},
		telegramMessageId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: 'Products', // Set the correct table name
	}
);

module.exports = Product;
