const pool = require('../../database/db');
const queries = require('../queries/customer.queries');

const getCustomers = (req, res) => {
    try {
        pool.query(queries.getCustomers, (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };

            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No customers found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
};

const getCustomerById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getCustomerById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };

            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No customers found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
       res.status(500).json({ message: error.message });
    }

};

module.exports = {
    getCustomers,
    getCustomerById
}