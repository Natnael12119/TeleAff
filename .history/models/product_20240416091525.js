const Sequelize = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define(
	'Product',
	{
		product_name: {
			type: Sequelize.STRING,
			allowNull: false,
			// field: 'product_name',
		},
		affiliate_link: {
			type: Sequelize.STRING,
			allowNull: false,
			// field: 'affiliate_link',
		},
		image: {
			type: Sequelize.STRING,
			field: 'image',
		},
	},
	{
		tableName: 'products',
		timestamps: false,
	}
);

module.exports = Product;
