//DB/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false // Adjust SSL settings if needed
});

console.log('Connecting to:', process.env.DATABASE_URL);

module.exports = pool;