//DB/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Adjust if needed
});

pool.connect()
    .then(client => {
        console.log("Connected to PostgreSQL Database");
        client.release();
    })
    .catch(err => console.error("Connection error:", err));

console.log('Connected to PGadmin Database');

module.exports = pool;