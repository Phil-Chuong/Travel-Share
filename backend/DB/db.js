//DB/db.js
require('dotenv').config();
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool( config.DB );


console.log('Connecting to:', config.DB);

module.exports = pool;