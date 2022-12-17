const orderModal = require('../modals/orderModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var commonServiceUrl = process.env.commonServiceUrl;

const orderCntrl = {
    placeOrder: {},
    getOrder:{},
    getOrderedProducts:{},
    deleteOrder:{},
    filterOrder:{},
}
orderCntrl.filterOrder = async( req , res , next )=>{
    orderModal.filterOrder(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.filterOrder", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: error })
            } else{
               commonResObj(res, 200, { message: 'Order fetched successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.filterOrder", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
orderCntrl.deleteOrder = async( req , res , next )=>{
    orderModal.deleteOrder(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.deleteOrder", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: error })
            } else{
               commonResObj(res, 200, { message: 'Order deleted successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.deleteOrder", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
orderCntrl.getOrderedProducts = async( req , res , next )=>{
    orderModal.getOrderedProducts(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.getOrderedProducts", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Order fetched successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.getOrderedProducts", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}
orderCntrl.getOrder = async( req , res , next )=>{
    orderModal.getOrder(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.getOrder", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Order fetched successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.getOrder", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}

orderCntrl.placeOrder = async( req , res , next )=>{
    orderModal.placeOrder(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.placeOrder", error: error, Api:commonServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Order placed successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.placeOrder", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}

// ==================MODULE EXPORTING==============
module.exports = orderCntrl;
