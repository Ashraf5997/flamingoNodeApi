const express         = require('express');
const authenticate    = require('../middlewares/auth');
const router          = express.Router(); 
const waterController = require('../controllers/water.controller');
router.post('/create/water-supplier/account/:id',waterController.createAccount);
router.post('/create/water-customer/account',waterController.createCustomerAccount);
router.get('/get/water-supplier/account/:userId',waterController.getAccount);
router.get('/get/water-customer/account/:userId',waterController.getCustomerAccount);
router.get('/get/water-supplier/list',waterController.getWaterSupplierList);
router.get('/get/water-customer/data/:userId',waterController.getWaterCustomerData);
router.post('/create/water-customer/place/order',waterController.placeWaterOrder)
router.get('/get/water-customer/order/by/userId/:userId',waterController.getUserOrdersByUserId)
router.post('/get/water-customer/order/by/userId/month',waterController.getUserOrdersByUserIdAndMonth)
router.get('/get/water-customer/order/by/userId/today/:userId',waterController.getUserOrdersByUserIdAndtoday)
router.get('/get/water-customer/order/by/supId/today/:supId',waterController.getOrdersBySupIdAndtoday)
router.post('/delete/water-customer/order/by/userId/today',waterController.deleteUserOrdersByUserIdAndtoday)
router.get('/update/water-customer/order/by/orderId/:orderId',waterController.updateUserOrdersByOrderId)
router.get('/get/water-customer/invoice/by/userId/:userId',waterController.getUserInvoice);
router.post('/pay/water-customer/invoice/by/invId',waterController.payUserInvoice)

module.exports = router;
