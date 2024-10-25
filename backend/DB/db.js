//DB/db.js
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Adjust if needed
});

console.log('Connected to PGadmin Database');

module.exports = pool;