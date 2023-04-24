const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const { setupModels } = require('../db/models/index');

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
const sequelize = new Sequelize(URI, {
  dialect: DB_ENGINE,
  logging: console.log,
});

setupModels(sequelize);

module.exports = sequelize;