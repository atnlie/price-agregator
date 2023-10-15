const pool = require('../../database/db');
const queries = require('../queries/delivery.queries');
const custQueries = require('../../quotation/queries/quotation.queries');
const { getTotalWeight, getLogisticDelivery, lowestFeeDelivery } = require('../../quotation/controllers/quotation.controller');
const { validateDelivery } = require('../../middleware/validator');

const getDelivery = (req, res) => {
    try {
        pool.query(queries.getDelivery, (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            }
            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No delivery found' })
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDeliveryById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getDeliveryByID, [id], (error, results) => {
            if (results.error) {
                res.status(500).json({ message: error.message });
            }
            if (results.rows.length === 0) {
              res.status(200).json({ message: 'No delivery found' })
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPoDetail = (po_id) => {
    try {
        return new Promise((resolve, reject) => pool.query(queries.getPoDetail, [po_id], (error, results) => {
            if (error) reject(error)
            resolve(results.rows);
        }));
    } catch (error) {
        throw error;
    }
}

const fleetFee = (objLogistic, fleet_type) => {
    return objLogistic.filter((logistic) => (logistic.fleet_type.toLowerCase() === fleet_type));
} 

const addDelivery = async (req, res) => {
    try {
        const { error } = validateDelivery(req.body);
        if (error) throw error;

        const { po_id } = req.body;
        const po = await getPoDetail(po_id);
        let customer_id = "";
        const sku_id_list = [];
        if (po.length > 0) {
            for (const sku of po) {
                sku_id_list.push(sku.sku_id);
                customer_id = sku.customer_id;
            }
        }
        const totalWeight = await getTotalWeight(sku_id_list, po_id);
        const logisticDelivery = await getLogisticDelivery(customer_id);
        
        const lowestFee = lowestFeeDelivery(totalWeight[0]?.total_weight || -1,
           fleetFee(logisticDelivery, 'fuso')[0]?.cost || -1, fleetFee(logisticDelivery, 'tronton')[0]?.cost || -1);
        
        const logistic_id = logisticDelivery.filter((logistic) => (logistic.fleet_type.toLowerCase() === lowestFee.fleet_type.toLowerCase()))[0]?.logistic_id;
        const delivery_date = new Date().toISOString().slice(0, 10);
       
        pool.query(queries.addDelivery,[logistic_id, delivery_date, po_id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            };
            
            res.status(201).json({ message:"Delivery created succesfully", result: results.rows });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeDelivery = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.removeDelivery, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: error.message });
                return;
            }
            res.status(200).json({ message: `Delivery deleted with ID: ${id}` });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getDelivery,
    getDeliveryById,
    addDelivery,
    removeDelivery
};