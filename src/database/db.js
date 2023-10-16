const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.PG_PASSWORD)

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

module.exports = pool