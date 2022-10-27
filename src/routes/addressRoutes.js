const express = require('express');
const router  = express.Router(); 
const addressdetailController   = require('../controllers/address.controller');


router.post('/addressDetail/create',      addressdetailController.createAddressDetail)
router.put('/addressDetail/update',       addressdetailController.updateAddressDetail)
router.get('/addressDetail/get/:userId',  addressdetailController.getAddressDetail)
module.exports = router;