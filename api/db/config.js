const { config } = require('../config/config');

const DB_ENGINE = encodeURIComponent(config.dbEngine);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Set port and user
let USER = encodeURIComponent(config.dbUser);
let PORT = encodeURIComponent(config.dbPort);

if (DB_ENGINE === 'mysql') {
  PORT = encodeURIComponent(config.dbMySQLPort);
  USER = 'root';
}

const URI = `${DB_ENGINE}://${USER}:${PASSWORD}@${config.dbHost}:${PORT}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: DB_ENGINE
  },

  production: {
    url: URI,
    dialect: DB_ENGINE
  }
}
