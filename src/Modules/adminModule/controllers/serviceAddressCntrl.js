const serviceAddressModal = require('../modals/serviceAddressModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const logger = require('../../../../config/logger.js')
var path = require('path');
const { appendFile } = require('fs');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const serviceAddressCntrl = {
    getAllServiceAddress: {},
    addServiceAddress: {},
    getServiceAddressById: {},
    updateServiceAddress:{},
    deleteServiceAddress:{},
    searchServiceAddress:{},
    // LANDMARK CONTROLLER FUNCTIONS
    getLandmarkByPincode:{},
    addLandmark:{},
    deleteLandmark:{}
}
// ======== LANDMARKS FUNCTIONS 
serviceAddressCntrl.addLandmark= async( req, res , next )=>{
    serviceAddressModal.addLandmark(req.body, (error, data) => { 
        try {
            let statusCode = null ; let message= null
          if (error) {
              if(error.errno == 1062){   statusCode = 409; message = error.sqlMessage }else{
                statusCode = 500;
                message = error.sqlMessage
              }
              logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "serviceAddressCntrl.addLandmark", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
              commonResObj(res, statusCode, { error: message })
          } else{
            commonResObj(res, 200, { message: 'Landmark added successfully', Data: data, })
          }    
        } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.addLandmark ", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
        }
      })
}

serviceAddressCntrl.getLandmarkByPincode = async ( req , res , next ) =>{
    serviceAddressModal.getLandmarkByPincode(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getLandmarkByPincode", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error.sqlMessage })
        } else{
            commonResObj(res, 200, { message: 'Landmarks fetched successfully', Data: data, })
        }
      } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getLandmarkByPincode", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
      }
    })
}
serviceAddressCntrl.deleteLandmark= async( req, res , next ) =>{
    serviceAddressModal.deleteLandmark(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.deleteLandmark", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res,500, { error: message })
        } else {
          commonResObj(res, 200, { message: 'Landmark deleted successfully', Data: data, })
        } 
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.deleteLandmark", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
}


serviceAddressCntrl.searchServiceAddress = async( req, res , next ) =>{
  let addObj = {
      block   : req.body.block,
      dist    : req.body.dist,
      state   : req.body.state,
      pincode : req.body.pincode,
      status  : req.body.status
  }
  serviceAddressModal.searchServiceAddress(addObj, (error, data) => { 
  try {
      let statusCode = null ; let message= null
    if (error) {
        if(error.errno == 1062){   statusCode = 409; message = error.sqlMessage }else{
          statusCode = 500;
          message = error.sqlMessage
        }
        logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "serviceAddressCntrl.searchServiceAddress", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
        commonResObj(res, statusCode, { error: message })
    } else{
      commonResObj(res, 200, { message: 'Service address searched successfully', Data: data, })
      
    }    
  } catch (error) {
    logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.searchServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
})
}
serviceAddressCntrl.addServiceAddress = async( req, res , next ) =>{
    let addressObj = {
        state   : req.body.state,
        dist    : req.body.dist,
        pincode : req.body.pincode,
        block: req.body.block,
        addedon    : new Date(),
        addedby    : req.body.addedby,
        userId     : req.body.userId,
        status  : req.body.status
    }
    serviceAddressModal.addServiceAddress(addressObj, (error, data) => { 
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
          logger.log({ level: "info", message: { file: "Modules/adminModule/controller" + filename, method: "serviceAddressCntrl.addServiceAddress", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else if (data != "") {
        commonResObj(res, 200, { message: 'Product added successfully', Data: data, })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.addServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

serviceAddressCntrl.updateServiceAddress = async( req, res , next ) =>{
    let addressObj = {
        state   : req.body.state,
        dist    : req.body.dist,
        pincode : req.body.pincode,
        block: req.body.block,
        lastModifiedBy    : req.body.lastModifiedBy,
        lastModifiedOn   : new Date(),
        userId     : req.body.userId,
        status  : req.body.status
   }
   serviceAddressModal.updateServiceAddress( addressObj ,req.params.id, (error, data) => {
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
                logger.log({ level: "info", message: { file: "Modules/adminModule/" + filename, method: "serviceAddressCntrl.updateServiceAddress", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
                commonResObj(res, statusCode, { error: message })
            } else if (data != "") {
              commonResObj(res, 200, { message: 'Service address updated successfully', Data: data, })
            }
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/" + filename, method: "serviceAddressCntrl.updateServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
  }
  

  serviceAddressCntrl.getAllServiceAddress= async(req,res,next)=>{
    serviceAddressModal.getAllServiceAddress(req, (error, data) => {
       try {
         if (error) {
           logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getAllServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 409 } });
           commonResObj(res, 500, { error: error.sqlMessage })
         } else  {
           commonResObj(res, 200, { message: 'Service address list  fetched successfully', Data: data, })
         }  
       } catch (error) {
         logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getAllServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
         commonResObj(res, 500, { error: error })
       }
     })
}

serviceAddressCntrl.getServiceAddressById = async ( req , res , next ) =>{
    serviceAddressModal.getServiceAddressById(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getServiceAddressById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500, { error: error.sqlMessage })
        }else{
            commonResObj(res, 200, { message: 'Service address fetched successfully', Data: data, })
        } 
      } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.getServiceAddressById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
      }
    })
}

serviceAddressCntrl.deleteServiceAddress= async( req, res , next ) =>{
    serviceAddressModal.deleteServiceAddress(req, (error, data) => {
      try {
        if (error) {
            logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.deleteServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
            commonResObj(res,500, { error: message })
        } else {
          commonResObj(res, 200, { message: 'Service deleted successfully', Data: data, })
        }
      } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "serviceAddressCntrl.deleteServiceAddress", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
      }
    })
}


//*******************    EXPORTING   ***************** */
module.exports = serviceAddressCntrl ;
