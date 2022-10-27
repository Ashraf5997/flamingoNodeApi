
const userMngModal = require('../modals/userMngModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const bcrypt = require('bcryptjs');

//const JwtService = require('../../../services/JwtService')
//const fast2sms = require('fast-two-sms')
//require("dotenv").config();

const logger = require('../../../../config/logger.js')
var path = require('path');
const { appendFile } = require('fs');
var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var adminServiceUrl = process.env.adminServiceUrl;

const userMngCntrl = {
  getAllUsers: {},
  addUser: {},
  deleteUser: {},
  updateUser: {},
  searchUser: {},
  getUserById:{},
  addRole:{},
  getRoleByUserId:{},
  deleteRole:{},
}
// DELETE ROLE
userMngCntrl.deleteRole = async( req , res , next )=>{
  userMngModal.deleteRole (req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.deleteRole ", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else {
         commonResObj(res, 200, { message: 'User role deleted successfully', Data: data, })
      } 
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.deleteRole", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}
// GET ROLE BY USER ID
userMngCntrl.getRoleByUserId = async ( req , res , next ) =>{
  userMngModal.getRoleByUserId (req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getRoleByUserId ", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else {
         commonResObj(res, 200, { message: 'User role fetched successfully', Data: data, })
      }
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getRoleByUserId", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}

// ADD ROLE
userMngCntrl.addRole = async( req, res , next ) =>{
  userMngModal.addRole(req, (error, data) => {
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
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.addRole", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else  {
        commonResObj(res, 200, { message: 'Role added successfully', Data: data, })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.addRole", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

// GET USER  BY ID
userMngCntrl.getUserById = async ( req , res , next ) =>{
  userMngModal.getUserById(req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getUserById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else  {
         commonResObj(res, 200, { message: 'User fetched successfully', Data: data, })
      } 
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getUserById", error: error, Api: adminServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}
// ADD USER
userMngCntrl.addUser = async( req, res , next ) =>{
  req.body.password = await bcrypt.hash(req.body.password, 10)
  userMngModal.addUser(req, (error, data) => {
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

          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.addUser", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else if (data != "") {
        commonResObj(res, 200, { message: 'User created successfully', Data: data, })
      } else {
        commonResObj(res, 404, { message: 'No content' })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.addUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}
// DELETE USER
userMngCntrl.deleteUser = async( req, res , next ) =>{
  userMngModal.deleteUser(req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.deleteUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res,500, { error: message })
       
      } else  {
        commonResObj(res, 200, { message: 'User deleted successfully', Data: data, })
      } 
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.deleteUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

// UPDATE USER
userMngCntrl.updateUser = async( req, res , next ) =>{
  userMngModal.updateUser(req, (error, data) => {
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
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.updateUser", error: error, Api: adminServiceUrl + req.url, status: statusCode } });
          commonResObj(res, statusCode, { error: message })
       
      } else  {
        commonResObj(res, 200, { message: 'User update successfully', Data: data, })
      } 
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.updateUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}


// SEARCH USER
userMngCntrl.searchUser = async( req, res , next ) =>{
  userMngModal.searchUser(req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.searchUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else  {
         commonResObj(res, 200, { message: 'User searched successfully', Data: data, })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.searchUser", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

// GET USER
userMngCntrl.getAllUsers = async(req,res,next)=>{
 // calling userMngModel 
  userMngModal.getAllUsers(req, (error, data) => {
    try {
      if (error) {
        logger.log({ level: "info", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getAllUsers", error: error, Api: adminServiceUrl + req.url, status: 409 } });
        commonResObj(res, 500, { error: error.sqlMessage })
      } else  {
        commonResObj(res, 200, { message: 'User list  fetched successfully', Data: data, })
      } 
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/adminModule/controllers/" + filename, method: "userMngCntrl.getAllUsers", error: error, Api: adminServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

module.exports = userMngCntrl;