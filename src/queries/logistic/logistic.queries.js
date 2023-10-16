const getLogistics = "SELECT * FROM logistic LIMIT 100";
const getLogisticById = "SELECT * FROM logistic WHERE logistic_id = $1";
const getLogisticByAreaCode = "SELECT * FROM logistic WHERE code_area = $1";
const addLogistics = "INSERT INTO Logistic (fleet_type, capacity, source, destination, cost, code_area) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const removeLogisticById = "DELETE FROM Logistic WHERE logistic_id = $1 RETURNING *";

module.exports = {
    getLogistics,
    getLogisticById,
    getLogisticByAreaCode,
    addLogistics,
    removeLogisticById
}