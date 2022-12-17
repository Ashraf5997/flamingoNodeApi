const express          = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router           = express.Router(); 
const invoiceController = require('../controllers/invoiceCntrl');

//router.get('/generate/invoice',invoiceController.generateInvoice );//nis
router.get('/generate/invoice',invoiceController.generateInvoice );//nis


//****************  EXPORTING ************** */
module.exports = router;