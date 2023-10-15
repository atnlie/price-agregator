const getProducts = "SELECT * FROM product LIMIT 100";
const getProductById = "SELECT * FROM product WHERE sku_id = $1";
const addProduct = "INSERT INTO product (sku_id, name, weight_in_kg, unit_of_measurement) VALUES ($1, $2, $3, $4) RETURNING *";
const removeProductById ="DELETE FROM product WHERE sku_id = $1 RETURNING *"

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    removeProductById
}   