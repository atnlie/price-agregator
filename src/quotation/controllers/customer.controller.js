const pool = require('../../database/db');
const queries = require('../queries/customer.queries');

const getCustomers = (req, res) => {
    pool.query(queries.getCustomers, (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
            res.status(200).json({ message: 'No customers found' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getCustomerById = (req, res) => {
    const { id } = req.params;
    
    pool.query(queries.getCustomerById, [id], (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
            res.status(200).json({ message: 'No customers found' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};


module.exports = {
    getCustomers,
    getCustomerById
};