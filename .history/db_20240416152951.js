require('dotenv').config(); // Import dotenv to read .env file
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT, // or any other database dialect
	logging: false, // disable logging
});

// Test the database connection
sequelize
	.authenticate()
	.then(() => {
		console.log(
			'Connection to the database has been established successfully.'
		);
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = sequelize;
