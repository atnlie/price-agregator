const { Router } = require('express');
const customerController = require('./controllers/customer.controller');


const router = Router();

router.get('/', customerController.getCustomers);

router.get('/:id', customerController.getCustomerById);

module.exports = router;
