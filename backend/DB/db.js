//DB/db.js
require('dotenv').config();
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool( config.DB_CONFIG);

console.log('Connecting to:', config.DB_CONFIG);

module.exports = pool;