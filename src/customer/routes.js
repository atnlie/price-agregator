const { Router } = require('express');
const customerController = require('./contollers/customer.controller');

const router = Router();

router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
