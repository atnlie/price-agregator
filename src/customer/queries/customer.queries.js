const getCustomers = "SELECT * FROM Customer LIMIT 100";
const getCustomerById = "SELECT * FROM Customer WHERE customer_id = $1";

module.exports = {
    getCustomers,
    getCustomerById
};