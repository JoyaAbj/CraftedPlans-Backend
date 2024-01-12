const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productsControllers = require('../controllers/productsController');
// const { authenticated } = require('../middleware/auth.js');

router.post('/addProduct', upload.array('images'), productsControllers.addProduct);
router.get('/getProductById/:Id', productsControllers.getProductById);
router.get('/getAll', productsControllers.getAllProducts);
router.post('/getProductByCategory', productsControllers.getProductByCategory);
router.post('/getProductByName', productsControllers.getProductByName);
router.put('/updateProduct/:Id', upload.array('images'), productsControllers.updateProduct);
router.put('/reduceQty/:Id',productsControllers.reduceQty);
router.delete('/deleteProduct/:Id', productsControllers.deleteProduct);
// router.post('/getAllProductsBySelector', productsControllers.getAllProductsBySelector);

module.exports = router;
