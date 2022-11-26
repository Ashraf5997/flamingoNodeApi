const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const orderController = require('../controllers/orderController');
//const orderValidation = require('../validations/orderValidation');
router.post('/place/order', auth,orderController.placeOrder );//nis
router.post('/get/order/:userId',orderController.getOrder );//nis
router.post('/get/ordered/products/',orderController.getOrderedProducts );//nis
router.post('/cancel/order',auth,orderController.deleteOrder );//nis


//****************  EXPORTING ************** */
module.exports = router;