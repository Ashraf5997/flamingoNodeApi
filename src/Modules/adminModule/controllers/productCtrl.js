const productModal = require('../modals/productModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
const { appendFile } = require('fs');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const productCntrl = {
    addProduct: {},
    updateProduct: {},
    deleteProduct: {},
    getAllProduct:{},
    getProductById:{},
    searchProduct:{}
}

productCntrl.searchProduct = async( req, res , next ) =>{
  productModal.searchProduct(req, (error, data) => { 
  try {
      let statusCode = null ; let message= null
    if (error) {
        if(error.errno == 1062){   statusCode = 409; message = error.sqlMessage }else{
          statusCode = 500;
          message = error.sqlMessage
        }
        logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "productCntrl.searchProduct", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
        commonResObj(res, statusCode, { error: message })
    } else{
      commonResObj(res, 200, { message: 'Product added successfully', Data: data, })
      
    }    
  } catch (error) {
    logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.searchProduct", error: error, Api: adminServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
})
}
productCntrl.addProduct = async( req, res , next ) =>{
    let prodObj = {
        productName   : req.body.productName,
        productCtgry  : req.body.productCtgry,
        productQnty   : req.body.productQnty,
        addedon       : new Date(),
        unit          : req.body.unit,
        addedby       : req.body.addedby,
        userId        : req.body.userId,
        remainingQnty : req.body.remainingQnty,
        isOutOfStock  : req.body.isoutofstock,
        ratePerKg     : req.body.ratePerkg,
        productImg : process.env.localhost+`/product/picture/${req.file.filename}`
    }
    productModal.addProduct(prodObj, (error, data) => { 
    try {
        let statusCode = null ; let message= null
      if (error) {
          if(error.errno == 1062){
            statusCode = 409;
            message = error.sqlMessage
          }else{
            statusCode = 500;
            message = error.sqlMessage
          }
          logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "productCntrl.addProduct", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else if (data != "") {
        commonResObj(res, 200, { message: 'Product added successfully', Data: data, })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.addProduct", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

productCntrl.updateProduct = async( req, res , next ) =>{
    let prodObj = {
        productName  : req.body.productName,
        productCtgry : req.body.productCtgry,
        productQnty  : req.body.productQnty,
        lastModifyBy : req.body.lastModifyBy,
        lastModifyDate : new Date(),
        userId         : req.body.userId,
        remainingQnty  : req.body.remainingQnty,
        isOutOfStock   : req.body.isoutofstock,
        ratePerKg      : req.body.ratePerkg,
        unit           : req.body.unit,
        // productImg : process.env.localhost+`/product/picture/${req.file.filename}`
   }
    productModal.updateProduct( prodObj ,req.params.id, (error, data) => {
      try {
          let statusCode = null
          let message= null
            if (error) {
                if(error.errno == 1062){
                statusCode = 409;
                message = error.sqlMessage
                }else{
                statusCode = 500;
                message = error.sqlMessage
                }
                logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.updateProduct", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
                commonResObj(res, statusCode, { error: message })
            } else if (data != "") {
              commonResObj(res, 200, { message: 'Product updated successfully', Data: data, })
            }
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.updateProduct", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
  }
  

productCntrl.getAllProduct= async(req,res,next)=>{
    productModal.getAllProduct(req, (error, data) => {
       try {
         if (error) {
           logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.getAllProduct", error: error, Api: adminServiceUrl + req.url, status: 409 } });
           commonResObj(res, 500, { error: error.sqlMessage })
         } else  {
           commonResObj(res, 200, { message: 'Product list  fetched successfully', Data: data, })
         }
       } catch (error) {
         logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.getAllProduct", error: error, Api: adminServiceUrl + req.url, status: 500 } });
         commonResObj(res, 500, { error: error })
       }
     })
}

productCntrl.getProductById = async ( req , res , next ) =>{
    productModal.getProductById(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.getProductById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error.sqlMessage })
        } else {
           commonResObj(res, 200, { message: 'Product fetched successfully', Data: data, })
        }
      } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.getProductById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
      }
    })
}

productCntrl.deleteProduct= async( req, res , next ) =>{
    productModal.deleteProduct(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.deleteProduct", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res,500, { error: message })
        } else  {
            commonResObj(res, 200, { message: 'Product deleted successfully', Data: data, })
        }   
      } catch (error) {
         logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "productCntrl.deleteProduct ", error: error, Api: adminServiceUrl + req.url, status: 500 } });
         commonResObj(res, 500, { error: error })
      }
    })
}


//*******************    EXPORTING   ***************** */
module.exports = productCntrl;
