const getCustomers = "SELECT * FROM Customer LIMIT 100";
const getCustomerById = "SELECT * FROM Customer WHERE customer_id = $1";
const removeCustomerById = "DELETE FROM Customer WHERE customer_id = $1 RETURNING *";
const addCustomer = "INSERT INTO Customer (customer_id, address, city, state, code_area) VALUES ($1, $2, $3, $4, $5) RETURNING *";

module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    removeCustomerById
};