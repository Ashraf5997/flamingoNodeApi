const express = require('express');
const router  = express.Router(); 
//const auth    =     require('../middlewares/auth');
//const extractTokenController  = require('../controllers/extractToken.controller');
const profileController         = require('../controllers/profile.controller');
const bankdetailController      = require('../controllers/bankdetail.controller');
const accountController         = require('../controllers/account.controller');
const pinrequestController      = require('../controllers/pinrequest.controller');
const withdrawalController      = require('../controllers/withdrawal.controller');
// ACTION URL 


// PROFILE CREATE
router.post('/profile/create',           profileController.createProfile)
router.put('/profile/update',            profileController.updateProfile)
router.get('/profile/get/:userId' ,      profileController.getProfile)
// BANKDETAIL CREATE
router.post('/bankDetail/create',        bankdetailController.createBankDetail)
router.put('/bankDetail/update',         bankdetailController.updateBankDetail)
router.get('/bankDetail/get/:userId',    bankdetailController.getBankDetail)
// ADDRESSDETAIL CREATE

// ACCOUNT
router.post('/account/create',          accountController.createAccount )
router.get('/account/get/:userId',      accountController.getAccount )
router.get('/account/get/all/request/active',       accountController.getAllAccountRequest )
router.post('/account/active/deactive',           accountController.deactActAccountRequest)
router.get('/account/search/accountId/:accountId',  accountController.searchAccountId)
router.get('/account/active/users',     accountController.getAllActiveUsers)
router.get('/account/active/userss/:userId',     accountController.getAllActiveUserss)
router.post('/account/update/TDate',    accountController.updateTDate )
router.post('/account/update/SLITDate', accountController.updateSLITDate )
router.post('/account/update/RI',       accountController.updateRI )
router.put('/account/update/RD/:RD',       accountController.updateRD )
router.get('/account/down/link/members/:accountId',accountController.getDownLinkMembers )
router.put('/update/level/users',accountController.updateLevel )

// PIN REQUEST
router.get('/pin-request/get/payment/list/:userId' , pinrequestController.getPaymentList)
router.post('/pin-request/create' , pinrequestController.createPinRequest )
router.get('/pin-request/get/all/:usercontact' , pinrequestController.getAllPinRequest )
router.get('/pin-request/getAll' , pinrequestController.getAll )
router.post('/pin-request/active' , pinrequestController.actPinReq )
router.delete('/pin-request/delete/:id' , pinrequestController.delPinReq )
router.get('/pin-request/act/get/all/:userId' , pinrequestController.getAllActPinRequest )
router.get('/pin-request/search/friend/:regNo' , pinrequestController.searchFriend )
router.post('/pin-request/send/pin',pinrequestController.sendPin)
router.post('/pin-request/generate/orderId',pinrequestController.generateOrderId)
router.post('/pin-request/generate/signature',pinrequestController.generateSignature)
// WITHDRAWAL
router.post('/withdrawal-request/create' , withdrawalController.createWithdrawal)
router.get('/withdrawal-history/get/:userId' , withdrawalController.getWithdrawalHistory)
router.get('/withdrawal-request/getAll' , withdrawalController.getWithdrawalAllRequest)
router.post('/withdrawal-request/pay' , withdrawalController.payWithdrawal)
module.exports = router;