const addressModal = require('../modals/addressModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var commonServiceUrl = process.env.commonServiceUrl;

const addressCntrl = {
    getAddresssByPincode:{},
    getDeliveryAddressByUserId:{},
    saveDeliveryAddrs:{},
}
addressCntrl.getDeliveryAddressByUserId = async( req , res , next)=>{
    addressModal.getDeliveryAddressByUserId( req , (error, data)=>{
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "addressCntrl.getDeliveryAddress", error: error, Api: commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: ' delivery address fetch succesfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "addressCntrl.getDeliveryAddress", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
addressCntrl.saveDeliveryAddrs = async(req,res,next)=>{
    addressModal.saveDeliveryAddrs(req, (error, data) => {
        try{
            let statusCode = null
            let message= null
            if (error) {
                  if(error.errno == 1062){
                    statusCode = 409;
                    message = `${req.body.receivercontact} is already added `
                  }else{
                    statusCode = 500;
                    message = error.sqlMessage
                  }
                  logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "addressCntrl.saveDeliveryAddrs", error: error, Api: commonServiceUrl + req.url,body:req.body, status: statusCode } });
                  commonResObj(res, statusCode, { error: message })
            } else{
               commonResObj(res, 200, { message: 'address saved succesfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "addressCntrl.saveDeliveryAddrs", error: error, Api: commonServiceUrl + req.url,body:req.body, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
addressCntrl.getAddresssByPincode = async( req , res , next )=>{
    addressModal.getAddresssByPincode(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "addressCntrl.getAddresssByPincode", error: error, Api: commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'address fetch succesfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "addressCntrl.getAddresssByPincode", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}

// ==================MODULE EXPORTING==============
module.exports = addressCntrl;
