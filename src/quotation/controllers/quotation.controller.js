const pool = require('../../database/db');
const queries = require('../queries/quotation.queries');
const { v4: uuidv4 } = require('uuid');
const { validateQuotation } = require('../../middleware/validator');

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
       res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

const addHistoricalPO = (bestOffer) => {
    try {
        const { customer_id, order_date, sku_id, quantity, uom, usp, po_id } = bestOffer;
        
        return new Promise((resolve, reject) => pool.query(queries.addHistoricalPO,
            [customer_id, order_date, sku_id, quantity, uom, usp, po_id],
            (error, results) => {
                if (error) reject(error)
                resolve({ message: 'historical po is created successfuly' });   
        }));
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const getBestQuotation = (po_id) => {
    try {
        return new Promise((resolve, reject) => pool.query(queries.getBestQuotation, [po_id], (error, results) => {
            if (error) reject(error)
            resolve(results.rows);
        }));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLogisticDelivery = (customer_id) => {
    try {
        return new Promise((resolve, reject) => pool.query(queries.getLogisticDelivery, [customer_id], (error, results) => {
            if (error) reject(error)
            resolve(results.rows);
        }));
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const getTotalWeight = (sku_id_list, customer_id) => {
    try {
        return new Promise((resolve, reject) => pool.query(queries.getTotalWeight, [sku_id_list, customer_id], (error, results) => {
            if (error) reject(error)
            resolve(results.rows);
        }));
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const lowestFeeDelivery = (weight_in_kg, fuso_cost, tronton_cost) => {
    /*
        - Assume only use fuso and tronton in one PO
        - Use only weight as a parameter
        TODO: For best fee we can combine both fuso and tronton in Ver 2.0
        TODO: For calculate for you, we need to use dimention as a parameter to eliminate over dimention in next Ver 2.0
    */
    // fuso

    try {
        const feeFuso = (Math.ceil((weight_in_kg / 1000) / 8)) * fuso_cost;

        const fFuso = {
            fee_delivery: feeFuso,
            fleet_type: 'Fuso',
            fleet_number: Math.ceil((weight_in_kg / 1000) / 8),
            weight_in_ton: Math.ceil(weight_in_kg / 1000),
            fleet_capacity: '8 Ton'
        };
        // tronton
        const feeTronton = (Math.ceil((weight_in_kg / 1000) / 22)) * tronton_cost;
        const fTronton = {
            fee_delivery: feeTronton,
            fleet_type: 'Tronton',
            fleet_number: Math.ceil((weight_in_kg / 1000) / 22),
            weight_in_ton: Math.ceil(weight_in_kg / 1000),
            fleet_capacity: '22 Ton'
        };
        return feeFuso < feeTronton ? fFuso : fTronton;
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

const addRFQ = async (req, res) => {
    try {
        const { error } = validateQuotation(req.body);
        if (error) throw error;

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
        const rfqQuotation = [];
        const bestQuotation = await getBestQuotation(po_id);
        if (bestQuotation.length > 0) {
            for (const bq of bestQuotation) {
                rfqQuotation.push({
                    'sku_id': bq.sku_id,
                    'quantity': bq.quantity,
                    'uom': bq.unit_of_measurement,
                    'price': bq.unit_selling_price,
                    'sub_total_price': bq.sub_total_price,
                })
            }
        }
        
        const fee_delivery = {
            address: '',
            city: '',
            total_weight_in_kg: 'kg',
            total_weight_in_ton: 'ton',
            fleet_type: '',
            number_of_fleet: '',
            fee: '',
        };
        const sku_id_list = [];
        for (const sku of rfq) {
            sku_id_list.push(sku.sku_id);
        }
        const totalWeight = await getTotalWeight(sku_id_list, po_id);
        const logisticDelivery = await getLogisticDelivery(customer_id);
        const fusoLogistic = logisticDelivery.filter((logistic) => {
            return logistic.fleet_type === 'Fuso';
        });

        const trontonLogistic = logisticDelivery.filter((logistic) => {
            return logistic.fleet_type === 'Tronton';
        });

        const lowestFee = lowestFeeDelivery(totalWeight[0]?.total_weight, fusoLogistic[0]?.cost || -1, trontonLogistic[0]?.cost || -1);

        if (logisticDelivery.length > 0) {
            fee_delivery.address = logisticDelivery[0]?.address || '-';
            fee_delivery.city = logisticDelivery[0]?.city || '-';
            fee_delivery.total_weight_in_kg = `${totalWeight[0]?.total_weight || '-'} kg`;
            fee_delivery.total_weight_in_ton = `${totalWeight[0]?.total_weight / 1000 || '-'} ton`;
            fee_delivery.fleet_type = lowestFee.fleet_type;
            fee_delivery.number_of_fleet = lowestFee.fleet_number;
            fee_delivery.fee = lowestFee.fee_delivery;
        }
       
        res.status(200).json({
            req_id: po_id,
            rfq_quotation: rfqQuotation,
            fee_delivery_estimation: fee_delivery
        }) 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRFQ,
    getTotalWeight,
    getLogisticDelivery,
    lowestFeeDelivery
};