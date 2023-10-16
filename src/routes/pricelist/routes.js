const { Router } = require('express');
const pricelistController = require('../../controllers/pricelist/pricelist.constroller');

const router = Router();

router.get('/', pricelistController.getPricelist);
router.post('/', pricelistController.addPricelist);
router.delete('/:id', pricelistController.removePricelistById);
router.delete('/:sku_id/:supplier_id', pricelistController.removeBySkuAndSupplier);
router.get('/:id/sku', pricelistController.getPriceListBySku);
router.get('/:id/supplier', pricelistController.getPriceListBySupplier);
router.put('/stock', pricelistController.updatePricelistStok);
router.put('/price', pricelistController.updatePricelistPrice);

module.exports = router;