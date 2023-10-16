const { Router } = require('express');
const supplierController = require('../../controllers/supplier/supplier.constroller');

const router = Router();

router.get('/', supplierController.getSuppliers);
router.post('/', supplierController.addSuppliers);
router.delete('/:id', supplierController.removeSupplierById);
router.get('/:id', supplierController.getSupplierById);

module.exports = router;