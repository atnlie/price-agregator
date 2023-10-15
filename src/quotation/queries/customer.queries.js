const getCustomers = "SELECT * FROM Customer";
const getCustomerById = "SELECT * FROM Customer WHERE customer_id = $1";
const addRfq = "INSERT INTO rfq_customer (customer_id, sku_id, quantity, unit_of_measurement, rfq_date, req_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const getProductBySku = "SELECT p.* FROM Product p WHERE p.sku_id = $1";
const getBestPrice = "SELECT pl.*, pd.weight_in_kg, pd.unit_of_measurement, pd.name FROM pricelist pl JOIN product AS pd ON pl.sku_id = pd.sku_id WHERE pl.pricelist_id = (SELECT MIN(p.pricelist_id) AS price_per_unit FROM pricelist p WHERE p.sku_id = $1 AND p.stock >= $2 GROUP BY p.sku_id LIMIT 1)";
const addHistoricalPO = "INSERT INTO public.historical_po (customer_id, order_date, sku_id, quantity, unit_of_measurement, unit_selling_price, po_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

module.exports = {
    getCustomers,
    getCustomerById,
    addRfq,
    getProductBySku,
    getBestPrice,
    addHistoricalPO
};