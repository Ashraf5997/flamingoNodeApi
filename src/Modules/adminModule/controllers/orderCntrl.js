const orderModal = require('../modals/orderModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const orderCntrl = {
    getAllOrder:{}
}

orderCntrl.getAllOrder = async( req , res , next )=>{
    orderModal.getAllOrder(req, (error, data) => {
        try{
            if (error) {
                logger.log({ level: "info", message: { file: "Modules/commonModule/controller" + filename, method: "orderCntrl.getAllOrder", error: error, Api:adminServiceUrl + req.url, status: 500 } });
                commonResObj(res, 500, { error: message })
            } else{
               commonResObj(res, 200, { message: 'Order list fetched successfully', Data: data, })
            }    
        }catch(error) {
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "orderCntrl.getAllOrder", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error })
        }
    })
}

// ==================MODULE EXPORTING==============
module.exports = orderCntrl;
