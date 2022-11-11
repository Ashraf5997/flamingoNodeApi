const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const accessController = require('../controllers/accessController');
const acessValidation = require('../validations/accessValidation');
 
router.post('/register', acessValidation.userRegValidation,accessController.userRegistration );
router.post('/login', acessValidation.userLoginValidation, accessController.userLogin );
router.get('/verify/contact/number/:contact', accessController.verifyContactNumber );  // NIS
router.get('/verify/otp/:otp/:otpId', accessController.verifyOtp );  // NIS
router.delete('/delete/otp/:otpId', accessController.deleteOtp );  // NIS
router.get('/get/module/list/by/userId/:userId', auth , acessValidation.getModuleByUserId, accessController.getModuleByUserId); // fetching modules with respect of userId
router.get('/get/tile/list/by/userId/:userId' , auth ,acessValidation.getTileByUserId , accessController.getTileByUserId); // fetching tile with respect of userId
router.get('/get/tile/list' , auth ,accessController.getTileList); // fetching all tiles
router.get('/get/module/list' , auth ,accessController.getModuleList); // fetching  all modules
router.get('/get/tile/by/moduleId/:moduleId' ,  auth ,acessValidation.getTileByModuleId,accessController.getTileByModuleId);// fetching tiles with respect of moduleId
router.get('/get/tile/by/moduleId/and/userId' , auth ,acessValidation.getTileByTIdAndMId,accessController.getTileByModuleIdAndUserId);// fetching tiles with respect of userId and moduleId query params
router.get('/get/role/by/tileId/:tileId' , auth ,acessValidation.getRoleByTileId,accessController.getRoleByTileId);// fetching tiles with respect of userId and moduleId query params
router.post('/resset/password',accessController.resetPassword); // NIS

//****************  EXPORTING ************** */
module.exports = router;