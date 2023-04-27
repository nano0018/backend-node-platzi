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

let URI = `${DB_ENGINE}://${USER}:${PASSWORD}@${config.dbHost}:${PORT}/${config.dbName}`;

if (config.isProd) {
  URI = `${config.dbURL}`;
  console.log(URI)
}

const sequelize = new Sequelize(URI, {
  dialect: DB_ENGINE,
  logging: config.isProd ? false : console.log,
});

setupModels(sequelize);

module.exports = sequelize;
