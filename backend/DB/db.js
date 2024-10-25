//DB/db.js
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.DATABASE_URL);
console.log('Connected to PGadmin Database');

// Test the connection
pool.connect()
    .then(() => console.log('PostgreSQL connection established'))
    .catch(err => console.error('Database connection error', err));

module.exports = pool;