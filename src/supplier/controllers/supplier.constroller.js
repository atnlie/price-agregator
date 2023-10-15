const pool = require('../../database/db');
const queries = require('../queries/supplier.queries');
const { validateSupplier } = require('../../middleware/validator');

const getSuppliers = (req, res) => {
    try {
        pool.query(queries.getSuppliers, (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            }
            res.status(200).json(results.rows);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addSuppliers = (req, res) => {
    try {
        const { error } = validateSupplier(req.body);
        if (error) throw error;

        const { supplier_id, address, city, state, code_area } = req.body;
        pool.query(queries.addSuppliers,
            [supplier_id, address, city, state, code_area], (error, results) => {
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

const removeSupplierById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removeSupplierById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            res.status(200).json({ message: 'Supplier deleted successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSupplierById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getSupplierById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            }
            res.status(200).json(results.rows);
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    getSuppliers,
    addSuppliers,
    removeSupplierById,
    getSupplierById
 }