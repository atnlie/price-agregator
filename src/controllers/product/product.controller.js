const pool = require('../../database/db');
const queries = require('../../queries/product/product.queries');
const { validateProduct } = require('../../middleware/validator');

const getProducts = (req, res) => {
    try {
        pool.query(queries.getProducts, (error, results) => {
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

const getProductById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getProductById, [id], (error, results) => {
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

const addProduct = (req, res) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) throw error;
        
        const { sku_id, name, weight_in_kg, unit_of_measurement } = req.body;
        pool.query(queries.addProduct,
            [sku_id, name, weight_in_kg, unit_of_measurement], (error, results) => {
                if (error) {
                    res.status(500).json({ message: error.message });
                    return;
                };
                res.status(201).json({ message: 'Product created successfuly' });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeProductById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removeProductById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            res.status(200).json({ message: 'Product deleted successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    removeProductById
}