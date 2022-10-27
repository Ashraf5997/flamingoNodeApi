const prodCtgryModal = require('../modals/prodCtgryModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
const { appendFile } = require('fs');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const prodCtgryCntrl = {
    addProdCtgry: {},
    updateProdCtgry: {},
    deleteProdCtgry: {},
    getAllProdCtgry:{},
    getProdCtgryById:{}
}
prodCtgryCntrl.addProdCtgry = async( req, res , next ) =>{
    let prodCtgryObj = {
        pctgryName:req.body.prodCtgryName,
        uploadedBy:req.body.uploadedBy,
        uploadedDate : new Date(),
        pctgryImg : process.env.localhost+`/category/picture/${req.file.filename}`
    }
    prodCtgryModal.addProdCtgry(prodCtgryObj, (error, data) => {
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
          logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "prodCtgryCntrl.addProdCtgry", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else  {
        commonResObj(res, 200, { message: 'Product category added successfully', Data: data, })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.addProdCtgry", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

prodCtgryCntrl.updateProdCtgry = async( req, res , next ) =>{
  let prodCtgryObj = {
    pctgryName:req.body.prodCtgryName,
    lastModifyBy:req.body.lastModifyBy,
    lastModifyDate : new Date(),
    //pctgryImg : process.env.localhost+`/category/picture/${req.file.filename}`
   }
    prodCtgryModal.updateProdCtgry( prodCtgryObj ,req.params.id, (error, data) => {
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
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.updateProdCtgry", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
            commonResObj(res, statusCode, { error: message })
         
        } else {
          commonResObj(res, 200, { message: 'Product category update successfully', Data: data, })
        }
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.updateProdCtgry", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
  }
  

prodCtgryCntrl.getAllProdCtgry= async(req,res,next)=>{
    prodCtgryModal.getAllProdCtgry(req, (error, data) => {
       try {
         if (error) {
           logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.getAllProdCtgry", error: error, Api: adminServiceUrl + req.url, status: 409 } });
           commonResObj(res, 500, { error: error.sqlMessage })
         } else {
           commonResObj(res, 200, { message: 'Product category list  fetched successfully', Data: data, })
         } 
       } catch (error) {
         logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.getAllProdCtgry", error: error, Api: adminServiceUrl + req.url, status: 500 } });
         commonResObj(res, 500, { error: error })
       }
     })
} 

prodCtgryCntrl.getProdCtgryById = async ( req , res , next ) =>{
    prodCtgryModal.getProdCtgryById(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.getProdCtgryById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error.sqlMessage })
        } else  {
           commonResObj(res, 200, { message: 'Product category fetched successfully', Data: data, })
        }
      } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.getProdCtgryById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
      }
    })
}

prodCtgryCntrl.deleteProdCtgry= async( req, res , next ) =>{
    prodCtgryModal.deleteProdCtgry(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.deleteProdCtgry", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res,500, { error: message })
        } else  {
          commonResObj(res, 200, { message: 'Product category deleted successfully', Data: data, })
        }
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "prodCtgryCntrl.deleteProdCtgry ", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
}

//*******************    EXPORTING   ***************** */
module.exports = prodCtgryCntrl;
