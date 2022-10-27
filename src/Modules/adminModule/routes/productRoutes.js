const express         = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router          = express.Router(); 
const productCntrl = require('../controllers/productCtrl');
const productValidation = require('../validations/productValidation');

const multer          = require('multer');
const path            = require('path');

const storage = multer.diskStorage({
    //  destination :'./picUpload/productPics',
    destination: function(req,file,cb){
          cb(null,'./picUpload/productPics')
    },
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const productPicupload =  multer({
  storage:storage, 
})

router.get('/get/product/list/',productCntrl.getAllProduct );
router.post('/add/product',auth,productValidation.addProduct , productPicupload.single('productImg'), productCntrl.addProduct );
router.get('/get/product/by/pId/:id',productCntrl.getProductById );
router.put('/update/product/:id',auth,productValidation.updateProduct,productCntrl.updateProduct );
router.delete('/delete/product/:id',auth,productValidation.deleteProduct,productCntrl.deleteProduct )
router.post('/search/product',auth,productValidation.searchProduct,productCntrl.searchProduct)


//****************  EXPORTING ************** */
module.exports = router;

