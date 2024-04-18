const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '*7I$9v8YeQca*F',
  database: 'teleaff_db',
  port: 5432
});

module.exports = sequelize;