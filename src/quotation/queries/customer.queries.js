const getCustomers = "SELECT * FROM Customer";
const getCustomerById = "SELECT * FROM Customer WHERE customer_id = $1";

module.exports = {
    getCustomers,
    getCustomerById
};