const express         = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router          = express.Router(); 
const serviceAddressCntrl = require('../controllers/serviceAddressCntrl');
const addressValidation = require('../validations/addressValidation');

router.get('/get/service/address/list/',auth,serviceAddressCntrl.getAllServiceAddress );
router.post('/add/service/address', auth,addressValidation.addServiceAddress,serviceAddressCntrl.addServiceAddress );
router.get('/get/service/address/:id',auth,serviceAddressCntrl.getServiceAddressById );
router.put('/update/service/address/:id',auth,serviceAddressCntrl.updateServiceAddress );
router.delete('/delete/service/address/:id',auth,serviceAddressCntrl.deleteServiceAddress )
router.post('/search/service/address',auth,addressValidation.searchServiceAddress,serviceAddressCntrl.searchServiceAddress)

// LAND MARK ROUTES
router.get('/get/landmark/:pincode',auth,serviceAddressCntrl.getLandmarkByPincode );
router.post('/add/landmark',auth,addressValidation.addLandmark, serviceAddressCntrl.addLandmark );
router.delete('/delete/landmark/:id',auth ,serviceAddressCntrl.deleteLandmark )




//****************  EXPORTING ************** */
module.exports = router;

