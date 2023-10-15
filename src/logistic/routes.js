const { Router } = require('express');
const logisticController = require('./controllers/logistic.controller');

const router = Router();

router.get('/', logisticController.getLogistics);
router.post('/', logisticController.addLogistics);
router.delete('/:id', logisticController.removeLogisticById);
router.get('/:id', logisticController.getLogisticById);
router.get('/:id/area', logisticController.getLogisticByAreaCode);

module.exports = router;