const getPricelist = "SELECT * FROM Pricelist LIMIT 100";
const getPricelistBySku = "SELECT * FROM Pricelist WHERE sku_id = $1";
const getPricelistBySupplier = "SELECT * FROM Pricelist WHERE supplier_id = $1";
const addPricelist = "INSERT INTO Pricelist (supplier_id, sku_id, price_per_unit, stock) VALUES ($1, $2, $3, $4) RETURNING *";
const removeBySkuAndSupplier = "DELETE FROM Pricelist WHERE sku_id = $1 AND supplier_id = $2 RETURNING *";
const removePricelistById = "DELETE FROM Pricelist WHERE pricelist_id = $1 RETURNING *";
const checkSupplierAndSkuExists = "SELECT s.* FROM Pricelist s WHERE s.supplier_id = $1 AND s.sku_id = $2";

module.exports = {
    getPricelist,
    getPricelistBySku,
    getPricelistBySupplier,
    addPricelist,
    checkSupplierAndSkuExists,
    removePricelistById,
    removeBySkuAndSupplier
};