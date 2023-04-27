require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbMySQLPort: process.env.MYSQL_PORT,
  dbEngine: process.env.DB_ENGINE,
  dbURL: process.env.DB_URL,
};

module.exports = { config }
