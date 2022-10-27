const express         = require('express');
const authenticate    = require('../middlewares/auth');
const router          = express.Router(); 
const usersController = require('../controllers/users.controller');
const multer          = require('multer');
const path            = require('path');

const storage = multer.diskStorage({
    destination :'./picUpload/proPics',
    filename    :(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload =  multer({
  storage:storage,
})

router.post('/register',usersController.registration);
router.post('/login',usersController.login);
router.post('/upload/profile/picture',upload.single('profilePic'),usersController.uploadProfilePic);
router.get('/otp/:contactnumber',usersController.getOtp);


router.get('/all/users',usersController.getAllUsers);
router.post('/update/user',usersController.updateUser)
router.post('/forgot/password',  usersController.forgotPassword);
router.post('/reset/password',  usersController.resetPassword);
router.get('/get/service/address/list',usersController.getServiceAddress)
router.get('/get/user/details/:userId',usersController.getUserDetails)
router.put('/update/user/address',usersController.updateUserAddress)
router.get('/get/user/address/:userId',usersController.getUserAddress)
router.post('/save/service/address',usersController.saveServiceAddress)
router.delete('/delete/service/address/:id',usersController.deleteServiceAddress)
router.get('/get/landmark/list/:pincode',usersController.getLandMark)
router.post('/create/landmark',usersController.createLandMark)
router.delete('/delete/landmark/:id',usersController.deleteLandMark)



module.exports = router;
