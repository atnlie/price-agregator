const { Router } = require('express');
const deliveryController = require('./controllers/delivery.controller');

const router = Router();

router.get('/', deliveryController.getDelivery);
router.post('/', deliveryController.addDelivery);
router.delete('/:id', deliveryController.removeDelivery);
router.get('/:id', deliveryController.getDeliveryById);

module.exports = router;
