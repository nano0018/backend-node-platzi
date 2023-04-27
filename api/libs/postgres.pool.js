const { Pool } = require('pg');
const { config } = require('../config/config');

const URI = config.dbURL;
const pool = new Pool({ connectionString: URI });

module.exports = { pool };
