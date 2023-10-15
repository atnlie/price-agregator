const { Router } = require('express');
const customerController = require('./controllers/customer.controller');


const router = Router();

router.get('/', customerController.getCustomers);

router.get('/:id', customerController.getCustomerById);

router.post('/rfq', customerController.addRFQ);

module.exports = router;
