const { Router } = require('express');
const logisticController = require('../../controllers/logistic/logistic.controller');

const router = Router();

router.get('/', logisticController.getLogistics);
router.post('/', logisticController.addLogistics);
router.delete('/:id', logisticController.removeLogisticById);
router.get('/:id', logisticController.getLogisticById);
router.get('/:id/area', logisticController.getLogisticByAreaCode);
router.put('/cost', logisticController.updateLogisticCost);
router.put('/area', logisticController.updateLogisticCodeArea);

module.exports = router;