const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const cartController = require('../controllers/cartController');
//const cartValidation = require('../validations/cartValidation');

router.post('/add/cart', auth,cartController.addCart );//nis
router.get('/get/cart/by/userId/:userId', auth,cartController.getCartByUserId );// nis
router.post('/remove/cart' , auth  , cartController.removeCartByUserIdPid); // nis 
router.delete('/delete/cart/:userId/:pId' , auth  , cartController.deleteCartByUserIdPid); // nis 

/*router.post('/get/all/cart/data',auth, cartController.getAllCart );
router.get('/get/cart/data/by/userId/:userId', auth , cartController.getCartByUserId); // fetching modules with respect of userId

//****************  EXPORTING ************** */
module.exports = router;