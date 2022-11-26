

const express         = require('express');
//const authenticate    = require('../middlewares/auth');
const auth = require('../../../middleWares/auths.js/auth');
const router          = express.Router(); 
const userMngCntrl    = require('../controllers/userMngCntrl');
const userValidation = require('../validations/userValidation');

//const multer          = require('multer');
//const path            = require('path');
router.get('/get/users' ,    auth , userValidation.getAllUsers,userMngCntrl.getAllUsers); 
router.post('/add/user' ,    auth , userValidation.addUserValidation , userMngCntrl.addUser); 
router.post('/search/user' , auth , userValidation.searchUserValidation , userMngCntrl.searchUser); 
router.get('/get/user/:id' , auth , userMngCntrl.getUserById); 
router.put('/update/user' ,  auth , userValidation.updateUserValidation, userMngCntrl.updateUser); 
router.delete('/delete/user/:id'  , auth, userValidation.deleteUser ,userMngCntrl.deleteUser);

// ================== DELIVERY PATNER  ROUTES
router.post('/add/delivery/patner' , auth ,userMngCntrl.addDeliveryPatner )
router.get('/get/delivery/patner/:userId' , auth ,userMngCntrl.getDeliveryPatner )
router.get('/get/all/delivery/patner' , auth ,userMngCntrl.getAllDeliveryPatner )
router.post('/deactive/active/delivery/partner/:userId' , auth ,userMngCntrl.updateDeliveryPatner )


// ============ ROLE ROUTES =========
router.post('/add/role/:userId' , auth , userValidation.addRole, userMngCntrl.addRole); 
router.get('/get/role/by/userId/:userId' , auth,  userMngCntrl.getRoleByUserId); 
router.delete('/delete/role/:rpId' , auth, userValidation.deleteRole, userMngCntrl.deleteRole); 


//****************  EXPORTING ************** */
module.exports = router;
