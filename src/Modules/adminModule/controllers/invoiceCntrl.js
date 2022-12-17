const invoiceModal = require('../modals/invoiceModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
const { appendFile } = require('fs');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const invoiceCntrl = {
    generateInvoice: {},
    createInvoice:{}

}

invoiceCntrl.generateInvoice = async( req , res , next )=>{
    invoiceModal.generateInvoice(req, (error, data) => {
      if(error){
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.generateInvoice", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }else{
        commonResObj(res, 200, { message: 'Invoice generated successfully', Data: data, })
      }
    })
}

invoiceCntrl.createInvoice = async( req , res , next )=>{


}



//*******************    EXPORTING   ***************** */
module.exports = invoiceCntrl;