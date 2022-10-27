const express         = require('express');
const authenticate    = require('../middlewares/auth');
const router          = express.Router(); 
const productController = require('../controllers/product.controller');
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
//var multipleImages = upload.fields([{name:'productImg'},{name:'categoryImg'},{name:'outOfStockImg'},{name:'sizeAImg'},{name:'sizeBImg'},{name:'sizeCImg'},{name:'sizeDImg'}])
router.post('/upload/product', productController.uploadProduct);
router.post('/upload/product/image',upload.single('productImg'),productController.uploadProductImg);
router.post('/upload/category/image',productController.uploadCategoryImg);
router.get('/get/all/products',productController.getAllProduct);
router.get('/get/category/list',productController.getCategoryList)
router.get('/get/ctgry/detail/:ctgry',productController.getCtgryDetail)
router.get('/get/qnty/list',productController.getQntyList)
router.post('/update/product/detail',productController.updateProductDetail)
router.delete('/delete/product/detail/:productId',productController.deleteProduct)
router.get('/get/product/detail/:productName',productController.getProductDetail)
router.post('/add/to/cart',productController.addToCart)
router.get('/get/from/cart/:userId',productController.getFromCart)
router.delete('/remove/from/cart/:productId',productController.removeFromCart)
router.post('/upload/category/picture',ctgryPicUpload.single('ctgryPic'),productController.uploadCtgry)
router.delete('/delete/category/picture/:ctgryId',productController.removeCtgry)





module.exports = router;