const { Router } = require('express');
const customerController = require('./contollers/customer.controller');

const router = Router();

router.get('/', customerController.getCustomers);
router.post('/', customerController.addCustomer);
router.delete('/:id', customerController.removeCustomerById);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
