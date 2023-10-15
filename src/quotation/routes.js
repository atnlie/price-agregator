const { Router } = require('express');
const customerController = require('./controllers/quotation.controller');

const router = Router();

router.post('/', customerController.addRFQ);

module.exports = router;
