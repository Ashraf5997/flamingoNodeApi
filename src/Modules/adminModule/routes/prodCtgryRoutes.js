const express         = require('express');
const auth = require('../../../middleWares/auths.js/auth');
const router          = express.Router(); 
const prodCtgryCntrl = require('../controllers/prodCtgryCntrl');
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
const upload =  multer({
  storage:storage, 
})
const storage2 = multer.diskStorage({
  destination :'./picUpload/ctgryPics',
  filename    :(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const ctgryPicUpload =  multer({
storage:storage2,
})

router.post('/add/prodCtrgy',auth,productValidation.addProdCtgry,ctgryPicUpload.single('prodCtgryImg'), prodCtgryCntrl.addProdCtgry );
router.get('/get/prodCtrgy/list/',prodCtgryCntrl.getAllProdCtgry );
router.get('/get/prodCtrgy/by/pcId/:id',prodCtgryCntrl.getProdCtgryById );
router.put('/update/prodCtrgy/:id',auth,productValidation.updateProdCtgry,prodCtgryCntrl.updateProdCtgry );
router.delete('/delete/prodCtrgy/:id', auth,productValidation.deleteProdCtgry, prodCtgryCntrl.deleteProdCtgry );

router.post('/up/pics',prodCtgryCntrl.up) 
//****************  EXPORTING ************** */
module.exports = router;

