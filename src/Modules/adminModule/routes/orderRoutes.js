const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const orderController = require('../controllers/orderCntrl');

router.get('/get/all/order/:limit/:page',orderController.getAllOrder );//nis


//****************  EXPORTING ************** */
module.exports = router;