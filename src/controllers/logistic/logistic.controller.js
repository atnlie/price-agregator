const pool = require('../../database/db');
const queries = require('../../queries/logistic/logistic.queries');
const { validateLogistic, validateLogisticCost, validateLogisticCodeArea } = require('../../middleware/validator');

const getLogistics = (req, res) => {
    try {
        pool.query(queries.getLogistics, (error, results) => {
            if (error) throw error;
            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No logistics found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch(error) {
    res.status(500).json({ message: error.message });
    }
};

const getLogisticById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getLogisticById, [id], (error, results) => {
            if (error) throw error;
            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No logistics found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch(error) {
    res.status(500).json({ message: error.message });
    }
};

const getLogisticByAreaCode = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getLogisticByAreaCode, [id], (error, results) => {
            if (error) throw error;
            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No logistics found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch(error) {
    res.status(500).json({ message: error.message });
    }
};

const addLogistics = (req, res) => {
    try {
        const { error } = validateLogistic(req.body);
        if (error) throw error;
        
        const { fleet_type, capacity, source, destination, cost, code_area } = req.body;
        pool.query(queries.addLogistics,
            [fleet_type, capacity, source, destination, cost, code_area], (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: 'Logistic created successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeLogisticById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removeLogisticById, [id], (error, results) => {
            if (error) throw error;
            res.status(200).json({ message: 'Logistic deleted successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

const updateLogisticCost = (req, res) => {
    try {
        const { error } = validateLogisticCost(req.body);
        if (error) throw error;

        const { cost, logistic_id } = req.body;
        pool.query(queries.updateLogisticCost, [cost, logistic_id], (error, results) => {
            if (error) throw error;
            res.status(200).json({ message: 'Logistic cost updated successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateLogisticCodeArea = (req, res) => {
    try {
        const { error } = validateLogisticCodeArea(req.body);
        if (error) throw error;

        const { code_area, logistic_id } = req.body;
        pool.query(queries.updateLogisticCodeArea, [code_area, logistic_id], (error, results) => {
            if (error) throw error;
            res.status(200).json({ message: 'Logistic cost updated successfuly' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getLogistics,
    getLogisticById,
    getLogisticByAreaCode,
    addLogistics,
    removeLogisticById,
    updateLogisticCost,
    updateLogisticCodeArea
}