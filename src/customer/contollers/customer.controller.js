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

const addCustomer = async (req, res) => {
    try {
        const { customer_id, address, city, state, code_area } = req.body;
        console.log(req.body);
        pool.query(queries.addCustomer,
            [customer_id, address, city, state, code_area], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            res.status(201).json({ message: 'Customer created successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeCustomerById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removeCustomerById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            }
            res.status(200).json({ message: `Customer deleted with ID: ${id}` });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    removeCustomerById
}