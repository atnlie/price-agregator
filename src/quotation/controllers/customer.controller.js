const pool = require('../../database/db');
const queries = require('../queries/customer.queries');
const { v4: uuidv4 } = require('uuid');

const getCustomers = (req, res) => {
    try {
        pool.query(queries.getCustomers, (error, results) => {
            if (error) throw error;

            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No customers found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
       throw error;
    }
};

const getCustomerById = (req, res) => {
    try {
        const { id } = req.params;
        pool.query(queries.getCustomerById, [id], (error, results) => {
            if (error) throw error;

            if (results.rows.length === 0) {
                res.status(200).json({ message: 'No customers found' });
            } else {
                res.status(200).json(results.rows);
            }
        });
    } catch (error) {
        throw error;
    }

};

const getProductBySku = (sku_id) => {
    try {
       return new Promise((resolve, reject) => pool.query(queries.getProductBySku, [sku_id], (error, results) => {
            if (error) reject(error)

           if (results.rows.length === 0) {
               resolve({ message: 'not found' });
               
            } else {
                resolve(results.rows);
            }
           
        }));
    } catch (error) {
        throw error;
    }
};

const getBestPrice = (sku_id, qty) => {
    try {
       return new Promise((resolve, reject) => pool.query(queries.getBestPrice, [sku_id, qty], (error, results) => {
            if (error) reject(error)

           if (results.rows.length === 0) {
               resolve({ message: 'out of stock' });
            } else {
                resolve(results.rows);
            }
           
        }));
    } catch (error) {
        throw error;
    }
};

const addHistoricalPO = (bestOffer) => {
    try {
        const { customer_id, order_date, sku_id, quantity, uom, usp, po_id } = bestOffer;
        
        return new Promise((resolve, reject) => pool.query(queries.addHistoricalPO,
            [customer_id, order_date, sku_id, quantity, uom, usp, po_id],
            (error, results) => {
                if (error) reject(error)
                resolve('success');   
        }));
    } catch (error) {
        throw error;
    }
}

const addRFQ = async (req, res) => {
    try {
        const { customer_id, rfq } = req.body;
        po_id = uuidv4();
        const order_date = new Date().toISOString().slice(0, 10);
        // add customer rfq
        for (const element of rfq) {
            const result = await getProductBySku(element.sku_id);
            const uom = result.message !== 'not found' ? result[0].unit_of_measurement : '-';
            pool.query(queries.addRfq,[customer_id, element.sku_id, element.qty, uom, order_date, po_id], (error, results) => {
                if (error) throw error;
                // res.status(201).json('RFQ added successfully');
                console.log('RFQ added successfully');
            });
        }

        // add hostorical po
        for (const quotation of rfq) {
            const result = await getBestPrice(quotation.sku_id, quotation.qty);
            console.log('quotation -> result');
            console.log(result);
            if (result.length >= 0 && result?.message !== 'out of stock') {
                const bestOffer = ({
                    sku_id: quotation.sku_id,
                    best_price: result[0].price_per_unit,
                    customer_id: customer_id,
                    order_date: order_date,
                    po_id: po_id,
                    uom: result[0].unit_of_measurement,
                    usp: result[0].price_per_unit,
                    wikg: result[0].weight_in_kg,
                    quantity: quotation.qty,
                });
                addHistoricalPO(bestOffer);
            }
        };
       
        
        // return data response

        // pool.query(queries.addRfq, (error, results) => {
            res.status(200).json({ message: 'RFQ added successfully' })
        // });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    addRFQ
};