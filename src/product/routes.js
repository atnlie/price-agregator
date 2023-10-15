const { Router } = require('express');
const productController = require('./controllers/product.controller');

const router = Router();

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.removeProductById);

module.exports = router;
