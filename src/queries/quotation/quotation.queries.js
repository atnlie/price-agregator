const addRfq = "INSERT INTO rfq_customer (customer_id, sku_id, quantity, unit_of_measurement, rfq_date, req_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const getProductBySku = "SELECT p.* FROM Product p WHERE p.sku_id = $1";
const getBestPrice = "SELECT pl.*, pd.weight_in_kg, pd.unit_of_measurement, pd.name FROM pricelist pl JOIN product AS pd ON pl.sku_id = pd.sku_id WHERE pl.pricelist_id = (SELECT MIN(p.pricelist_id) AS price_per_unit FROM pricelist p WHERE p.sku_id = $1 AND p.stock >= $2 GROUP BY p.sku_id LIMIT 1)";
const addHistoricalPO = "INSERT INTO Historical_po (customer_id, order_date, sku_id, quantity, unit_of_measurement, unit_selling_price, po_id, supplier_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
const getBestQuotation = "SELECT po.*, (po.quantity * po.unit_selling_price) AS sub_total_price FROM public.historical_po po WHERE po.po_id = $1"
const getLogisticDelivery = "SELECT c.*, l.source, l.destination, l.capacity, l.fleet_type, l.logistic_id, l.cost FROM customer c JOIN logistic AS l ON c.code_area  = l.code_area WHERE c.customer_id =$1 AND l.destination = c.city";
const getTotalWeight = "SELECT sum(p.weight_in_kg * hp.quantity) AS total_weight FROM product p JOIN historical_po AS hp ON p.sku_id = hp.sku_id WHERE p.sku_id = ANY ($1) AND hp.po_id = $2";

module.exports = {
    addRfq,
    getProductBySku,
    getBestPrice,
    addHistoricalPO,
    getBestQuotation,
    getLogisticDelivery,
    getTotalWeight
};