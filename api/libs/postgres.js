const pg = require('pg');
require('dotenv').config();

async function getDBConnection() {
  const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await client.connect();
  return client;
}

module.exports = { getDBConnection };
