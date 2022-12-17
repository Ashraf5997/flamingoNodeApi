const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const addressController = require('../controllers/addressController');
//const cartValidation = require('../validations/cartValidation');

router.get('/get/address/by/pincode/:pincode',auth,addressController.getAddresssByPincode); //nis
router.post('/save/delivery/address',auth,addressController.saveDeliveryAddrs); // nis
router.get('/get/delivery/address/:userId',auth,addressController.getDeliveryAddressByUserId); //nis
router.put('/update/delivery/address/:delAddId/:userId',auth,addressController.updateDeliveryAddress); //nis
router.delete('/delete/delivery/address/:delAddId/:userId',auth,addressController.deleteDeliveryAddress); //nis
//****************  EXPORTING ************** */
module.exports = router;