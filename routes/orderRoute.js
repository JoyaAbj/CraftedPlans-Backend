const express=require('express');
const router=express.Router();
const orderControllers=require('../controllers/orderController');
router.get('/getAll',orderControllers.getAll);
router.get('/getOrderById/:Id',orderControllers.findByUserId);
router.get('/getOrders',orderControllers.selectingOrderData);
router.get('/getOrdersByUserId/:Id',orderControllers.selectingOrderDataByUserId);
router.post('/add',orderControllers.add);
router.put('/updateStatus/:Id',orderControllers.updateOrderToDoneById);
router.put('/updateOrder/:Id',orderControllers.updateOrderById);
router.delete('/deleteOrder/:Id',orderControllers.deleteOrder);


module.exports=router;