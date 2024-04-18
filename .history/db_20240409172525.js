const Sequelize = require('sequelize');

const pool = new Pool({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '*7I$9v8YeQca*F',
  database: 'teleaff_db',
  port: 5432
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  pool
});

(async () => {
  try {
      await sequelize.sync();
      console.log('Database connection established and models synchronized.');
  } catch (error) {
      console.error('Error synchronizing models:', error);
  }
})();

module.exports = sequelize;