const getSuppliers = "SELECT * FROM Supplier LIMIT 100";
const getSupplierById = "SELECT * FROM Supplier WHERE supplier_id = $1";
const addSuppliers = "INSERT INTO public.supplier (supplier_id, address, city, state, code_area) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const removeSupplierById = "DELETE FROM Supplier WHERE supplier_id = $1 RETURNING *";

module.exports = {
    getSuppliers,
    addSuppliers,
    removeSupplierById,
    getSupplierById
};