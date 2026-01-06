import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// WARNING: In a real production environment, never commit credentials.
// Use environment variables (process.env.DB_HOST, etc.)
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'investai_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;

/* 
Usage Example:
import pool from './config.js';
const res = await pool.query('SELECT NOW()');
console.log(res.rows[0]);
*/
