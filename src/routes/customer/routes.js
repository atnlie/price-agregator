const { Router } = require('express');
const customerController = require('../../controllers/customer/customer.controller');

const router = Router();

router.get('/', customerController.getCustomers);
router.post('/', customerController.addCustomer);
router.delete('/:id', customerController.removeCustomerById);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
