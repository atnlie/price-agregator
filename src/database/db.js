const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'price_agregator',
    password: 'Admin2023!',
    port: 5432,
});

module.exports = pool