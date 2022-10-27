const express         = require('express');
const authenticate    = require('../middlewares/auth');
const router          = express.Router(); 
const orderController = require('../controllers/order.controller');

router.post('/place/order', orderController.placeOrder);
router.get('/get/order/:orderId', orderController.getOrder);
router.get('/get/order/no/:id', orderController.getOrderByNo);
router.get('/get/placed/order', orderController.getPlacedOrder);
router.get('/get/order/history/:userId', orderController.getOrderHistory);
router.post('/update/order',orderController.updateOrder);
router.post('/get/today/order',orderController.getOrderToday);
router.delete('/delete/today/order/:id',orderController.deleteOrderToday);
module.exports = router;