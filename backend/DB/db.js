//DB/db.js
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.DB);
console.log('Connected to PGadmin Database');

module.exports = pool;