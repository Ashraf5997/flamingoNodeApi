const cartModal = require('../modals/cartModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var commonServiceUrl = process.env.commonServiceUrl;

const cartCntrl = {
    addCart: {},
    //getAllCart: {},
    getCartByUserId: {},
    removeCartByUserIdPid:{},
    deleteCartByUserIdPid:{}
  
}

cartCntrl.deleteCartByUserIdPid = async( req , res , next )=>{
    cartModal.deleteCartByUserIdPid(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "cartCntrl.deleteCartByUserIdPid", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Cart item successfully deleted', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "cartCntrl.deleteCartByUserIdPid", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
cartCntrl.removeCartByUserIdPid = async( req , res , next )=>{
    cartModal.removeCartByUserIdPid(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "cartCntrl.removeCartByUserIdPid", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Cart item successfully removed', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "cartCntrl.removeCartByUserIdPid", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}

cartCntrl.getCartByUserId = async( req , res , next )=>{
    cartModal.getCartByUserId(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "cartCntrl.getCartByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Cart item successfully fetched', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "cartCntrl.getCartByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
cartCntrl.addCart = async( req, res , next ) =>{
    cartModal.addCart(req.body, (error, data) => { 
    try{
        let statusCode = null ; let message= null
        if (error) {
            if(error.errno == 1062){   statusCode = 409; message = error.sqlMessage }else{
              statusCode = 500;
              message = error.sqlMessage
            }
            logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "cartCntrl.addCart", error: error, Api: commonServiceUrl + req.url, status: statusCode } });
            commonResObj(res, statusCode, { error: message })
        } else{
           commonResObj(res, 200, { message: 'Item added successfully in your cart', Data: data, })
        }    
    }catch(error) {
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "cartCntrl.addCart", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
})
}


// ==================MODULE EXPORTING==============
module.exports = cartCntrl;
