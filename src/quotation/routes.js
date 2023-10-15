const { Router } = require('express');
const customerController = require('./controllers/quotation.controller');


const router = Router();

// router.get('/', customerController.getCustomers);

// router.get('/:id', customerController.getCustomerById);

router.post('/', customerController.addRFQ);

module.exports = router;
