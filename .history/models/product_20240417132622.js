const Sequelize = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define(
	'Product',
	{
		productName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'product_name',
		},
		affiliateLink: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'affiliate_link',
		},
		image: {
			type: Sequelize.STRING,
			allowNull: true, // make sure it allows null as multer will only upload the image if it's there
			field: 'image',
		},
	},
	{
		tableName: 'products',
		timestamps: false,
	}
);

module.exports = Product;
