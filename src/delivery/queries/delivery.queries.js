const getDelivery = "SELECT d.* FROM public.delivery d LIMIT 100";
const getDeliveryByID = "SELECT  hp.customer_id ,d.po_id, d.delivery_date, d.logistic_id , l.fleet_type, l.destination, l.cost FROM delivery d JOIN historical_po AS hp ON hp.po_id = d.po_id JOIN logistic AS l ON l.logistic_id = d.logistic_id WHERE d.po_id = $1 limit 1";
const addDelivery = "INSERT INTO public.delivery (logistic_id, delivery_date, po_id) VALUES ($1, $2, $3) RETURNING *";
const getPoDetail = "SELECT hp.po_id, hp.customer_id, hp.sku_id , hp.quantity, hp.unit_of_measurement, hp.unit_selling_price FROM historical_po hp WHERE hp.po_id = $1";
const removeDelivery = "DELETE FROM public.delivery WHERE po_id = $1";

module.exports = {
    getDelivery,
    getDeliveryByID,
    addDelivery,
    getPoDetail,
    removeDelivery
};