const pool = require('../../database/db');
const queries = require('../../queries/pricelist/pricelist.queries');
const { validatePricelist } = require('../../middleware/validator');

const getPricelist = (req, res) => {
    try {
        pool.query(queries.getPricelist, (error, results) => {
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

const getPriceListBySku = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getPricelistBySku, [id], (error, results) => {
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

const getPriceListBySupplier = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getPricelistBySupplier, [id], (error, results) => {
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

const addPricelist = (req, res) => {
    try {
        const { error } = validatePricelist(req.body);
        if (error) throw error;
        
        const { supplier_id, sku_id, price_per_unit, stock } = req.body;
        // check if sku_id and supplier_id exists
        pool.query(queries.checkSupplierAndSkuExists, [supplier_id, sku_id], (error, results) => {
            if (error) throw error;
            if (results.rows.length > 0) {
                res.status(400).json({ message: 'Supplier or SKU already exist' });
                return;
            } else {
                pool.query(queries.addPricelist,[supplier_id, sku_id, price_per_unit, stock], (error, results) => {
                if (error) {
                    res.status(500).json({ message: error.message });
                    return;
                };
                res.status(201).json({ message: 'Customer created successfuly' });
            });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removePricelistById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removePricelistById, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            res.status(200).json({ message: 'Pricelist deleted successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeBySkuAndSupplier = (req, res) => {
    try {
        const { sku_id, supplier_id } = req.params;
        pool.query(queries.removeBySkuAndSupplier, [sku_id, supplier_id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            res.status(200).json({ message: 'Pricelist deleted successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    getPricelist,
    getPriceListBySku,
    getPriceListBySupplier,
    addPricelist,
    removePricelistById,
    removeBySkuAndSupplier
 }