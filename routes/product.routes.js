const { Router } = require('express');

const ProductController = require("../controllers/ProductControllerOld");

const productController = new ProductController();
const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findOneById);
router.post('/', productController.save);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;