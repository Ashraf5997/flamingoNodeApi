
const accessModal = require('../modals/accessModal');
const commonResObj = require('../../../middleWares/responses/commonResponse')
const JwtService = require('../../../services/JwtService')
const refreshJwtService = require('../../../services/refreshJwtService')
const bcrypt = require('bcryptjs');
const fast2sms = require('fast-two-sms')
require("dotenv").config();
const logger = require('../../../../config/logger.js')
const moduleData = require('../../../../config/modulesData.js')
const tileData = require('../../../../config/tilesData.js')
var path = require('path');
//const { appendFile } = require('fs');

var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var commonServiceUrl = process.env.commonServiceUrl;

const accessController = {
  userRegistration: {},
  userLogin: {},
  verifyContactNumber:{},
  verifyOtp:{},    
  deleteOtp:{},    
  getModuleList:{},
  getTileList:{},
  getModuleByUserId:{},
  getTileByUserId:{},
  getRoleByTileId:{},
  getTileByModuleId:{},
  getTileByModuleIdAndUserId:{},
  resetPassword:{}
}

//  (13).  ====================  RESSET PASSWORD   ===========================
accessController.resetPassword= ( req, res ,  next )=>{
       bcrypt.hash(req.body.password, 10).then(resHash => {
       req.body.password =resHash;
       try{
          accessModal.ressetPassword(req, (error, data) => {
          if(error){ 
            logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.resetPassword", error: error, Api: commonServiceUrl + req.url, status:500} });
            commonResObj(res, 500 , { error: error }) 
          } else{
            commonResObj(res,200 , {Data: data})
          }})
    }catch(error){
      logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.resetPassword", error: error, Api: commonServiceUrl + req.url, status:500} });
      commonResObj(res, 500 , { error: error })
    }
    })
 
}
//  (12).  ====================  DELETE OTP NUMBER  ===========================
accessController.deleteOtp= ( req, res ,  next )=>{
  try{
      accessModal.deleteOtp(req, (error, data) => {
      if(error){ 
         logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.deleteOtp", error: error, Api: commonServiceUrl + req.url, status:500} });
         commonResObj(res, 500 , { error: error }) 
      } else{
         commonResObj(res,200 , {Data: data})
      }})
  }catch(error){
    logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.deleteOtp", error: error, Api: commonServiceUrl + req.url, status:500} });
    commonResObj(res, 500 , { error: error })
  }
}
//  (11).  ====================  VERIFY OTP NUMBER  ===========================
accessController.verifyOtp= ( req, res  )=>{
  try{
      accessModal.verifyOtp(req, (error, data) => {
      if(error){  commonResObj(res, 500 , { error: error }) } else{
        commonResObj(res,200 , {Data: data})
      }})
  }catch(error){
    logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.verifyOtp", error: error, Api: commonServiceUrl + req.url, status:500} });
    commonResObj(res, 500 , { error: error })
  }
}
//  (10).  ====================  VERIFY CONTACT NUMBER  ===========================
accessController.verifyContactNumber = ( req, res ,  next )=>{
  try{
      var contactPetrn = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if(contactPetrn.test(req.params.contact)){
          accessModal.verifyContactNumber(req, (error, data) => {
             if(error){  commonResObj(res, 500 , { error: error }) } else{
                  /*  let number = req.params.contact;
                    let API_KEY = process.env.API_KEY;
                    let message = ` Hi ${data[0].username} Your 6 digits otp for reset-password is : ${otp} . Do not share with others regards: www.flamingo.in, THANKS`;
                    const response = fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})*/
                  // if(response.return == true){
                    commonResObj(res,200 , {Data: data})
             }
          })
      }else{
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.verifyContactNumber", error: "Please provide your registered contact number", Api: commonServiceUrl + req.url, status: 412} });
        commonResObj(res, 412, { error: "Please provide valid contact number" })
      }
  }catch(error){
    logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.verifyContactNumber", error: error, Api: commonServiceUrl + req.url, status:500} });
    commonResObj(res, 500 , { error: error })
  }
}

//  (1).  ====================  USER REGISTRATION ===========================
accessController.userRegistration = async (req, res, next) => {
  let hashedPassword  //bcrypt.hash(req.body.password,10)
  bcrypt.hash(req.body.password, 10).then(resHash => {
    hashedPassword = resHash
    const userObj = {
      username: req.body.username,
      usercontact: req.body.usercontact,
      createdon: new Date(),
      createdby: (req.body.createdby == null) ? "self created" : req.body.createdby,
      lastModifiedBy: null,
      lastModifiedOn: null,
      password: hashedPassword,
      isdeleted: "N",
      accesstype: (req.body.accesstype == null) ? "Customer" : req.body.accesstype,
    }
    // calling accessModel 
    accessModal.userRegistration(userObj, (error, data) => {
      try {
          if (error) {
            logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.userRegistration", error: error, Api: commonServiceUrl + req.url, status: 500 } });
            commonResObj(res, 500 , { error: error.sqlMessage })
          } else {
            /* let API_KEY = process.env.API_KEY;
            var password = req.body.password
            let message = "Hi : "+req.body.username+" your password is "+password+" do not share with others regards: www.cookfast.in, THANKS";
            //  const response =  fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[req.body.usercontact]})*/
            commonResObj(res, 200, { data: userObj })
          }
      } catch (error) {
          logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.userRegistration", error: error, Api: commonServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error })
      }
    })
  })
}



//  (2).  ====================  USER LOGIN ===========================
accessController.userLogin = async (req, res, next) => {
  // calling accessModel 
  accessModal.userLogin(req, (error, data) => {
    try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.userLogin", error: error, Api: commonServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data != "") {
          bcryptedPassword = data.userDetail[0].password;
          bcrypt.compare(req.body.password, bcryptedPassword, (err, result) => {
              if (result) {
                // Generating Token 
              let  access_token = JwtService.sign({ id:data.userDetail[0].userId, accesstype:data.userDetail[0].accesstype, fullname:data.userDetail[0].username, permission:data.userPermissions })
              let  refresh_token = refreshJwtService.sign({ id:data.userDetail[0].userId, accesstype:data.userDetail[0].accesstype, fullname:data.userDetail[0].username, permission:data.userPermissions })
                commonResObj(res, 200, { message: 'Access Verified', userData: data, access_token, refresh_token })
              } else {
                commonResObj(res, 401, { message: 'Access Denied Invalid Credentials' })
              }
          })
      } else {
          commonResObj(res, 401, { message: 'Access Denied Invalid Credentials' })
      }
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.userLogin", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}


//  (3)========== GETING MODULE LIST  BY USER ID ==============
accessController.getModuleByUserId = async (req, res, next) => {
  // calling accessModel 
  accessModal.getModuleByUserId(req, (error, data) => {
  try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getModuleByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data != "") {
           // ==== CALLING MODULEDATA ====
            moduleData( data , (err , resData) =>{
              if(!err){
                commonResObj(res, 200, { message: 'module list  fetched successfully', Data: resData, })
              }
            })
      } else {
         commonResObj(res, 401, { message: 'Access Denied Invalid Credentials' })
      }
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getModuleByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}

//  (4)========== GETING TILE LIST ==============
accessController.getTileList = async (req, res, next) => {
  // calling accessModel 
  accessModal.getTileList(req, (error, data) => {
    try {
      if (error) {
        logger.log({ level: "info", message: { file: "Modules/commonModule/" + filename, method: "accessController.getTileList", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data != "") {
        commonResObj(res, 200, { message: 'Tile list  fetched successfully', Data: data, })
      } else {
        commonResObj(res, 401, { message: 'Not Authorized' })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileList", error: error, Api: commonServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

//  (5)========== GETING TILE  AND MODULE WITH RESPECT OF MODULE ID ==============
accessController.getTileByModuleId = async (req, res, next) => {
  // calling accessModel 
  accessModal.getTileByModuleId(req, (error, data) => {
    try {
      if (error) {
        logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByModuleId", error: error, Api: commonServiceUrl + req.url, status: 409 } });
        commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data.length >0) {
        let resData=[]
        for(let i =0; i< data.length;i++){
          if(resData.length == 0 &&  data[i].moduleId != null){
                 resData.push({
                  moduleName:data[i].moduleName,
                  moduleId:data[i].moduleId,
                  tiles:[]
                })
                resData[i].tiles.push({
                  tileId:data[i].tileId,
                  moduleId:data[i].moduleId,
                  tileName:data[i].tileName
                })
          }else{ 
              for(let j = 0 ; j< resData.length; j++){
                 if((data[i].moduleId == resData[j].moduleId) && data[i].moduleId != null && data[i].moduleId != undefined && data[i].moduleId != ""){
                    if(data[i].tileId != null && data[i].tileId != "" &&  data[i].tileId != undefined ){
                      resData[j].tiles.push({
                        tileId:data[i].tileId,
                        moduleId:data[i].moduleId,
                        tileName:data[i].tileName
                      })
                    }
                      
                  }else if( j == resData.length-1 &&  data[i].moduleId != null){
                    resData.push({
                      moduleName:data[i].moduleName,
                      moduleId:data[i].moduleId,
                      tiles:[]
                    })
                    resData[j].tiles.push({
                      tileId:data[i].tileId,
                      moduleId:data[i].moduleId,
                      tileName:data[i].tileName
                    })

                  }
              }
          }
        }
        commonResObj(res, 200, { message: 'Tile list by module id fetched successfully', Data: resData})
      } else {
        commonResObj(res, 200, { message: 'Tile list by module id fetched successfully', Data: []})
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByModuleId", error:error, Api: commonServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}

//  (6)========== GETING MODULE LIST ==============
accessController.getModuleList = async (req, res, next) => {
  // calling accessModel 
  accessModal.getModuleList(req, (error, data) => {
    try {
      if (error) {
        logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getModuleList", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data != "") {
        moduleData( data , (err , resData) =>{
          if(!err){
            commonResObj(res, 200, { message: 'module list  fetched successfully', Data: resData, })
          }
        })
        //commonResObj(res, 200, { message: 'Module  list  fetched successfully', Data: data, })
      } else {
        commonResObj(res, 401, { message: 'Not Authorized' })
      }
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getModuleList", error: error, Api: commonServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}


//  (7)========== GETING TILE BY MODULE ID AND USER ID ==============
accessController.getTileByModuleIdAndUserId = async (req, res, next) => {
  // calling accessModel 
  accessModal.getTileByModuleIdAndUserId(req, (error, data) => {
    try {
      if (error) {
        logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByModuleIdAndUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data) {
         // ==== CALLING MODULEDATA ====
         tileData( data , (err , resData) =>{
          if(!err){
             commonResObj(res, 200, { message: 'Tile list  fetched successfully', Data: resData, })
          }
        })
      } 
    } catch (error) {
      logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByModuleIdAndUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
      commonResObj(res, 500, { error: error })
    }
  })
}


//  (8)========== GETING TILE LIST  BY USER ID ==============
accessController.getTileByUserId = async (req, res, next) => {
  // calling accessModel 
  accessModal.getTileByUserId(req, (error, data) => {
  try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data) {
           // ==== CALLING TILEDATA ====
            tileData( data , (err , resData) =>{
              if(!err){
                commonResObj(res, 200, { message: 'tile list  fetched successfully', Data: resData, })
              }
            })
      } 
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getTileByUserId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}


//  (9)========== GETING ROLE LIST  BY TILE ID ==============
accessController.getRoleByTileId = async (req, res, next) => {
  // calling accessModel 
  accessModal.getRoleByTileId(req, (error, data) => {
  try {
      if (error) {
          logger.log({ level: "info", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getRoleByTileId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
          commonResObj(res, 500, { error: error.sqlMessage })
      } else if (data != "") {
                commonResObj(res, 200, { message: 'role list  fetched successfully', Data: data, })
      }else{
        commonResObj(res, 404, { message: `role with  tile id ${req.params.tileId} not found`, Data: data, })
      }
    } catch (error) {
        logger.log({ level: "error", message: { file: "Modules/commonModule/controllers/" + filename, method: "accessController.getRoleByTileId", error: error, Api: commonServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
  })
}

module.exports = accessController;


//const auth    =     require('../../../middlewaresqqqqqqqq/auth');


/*const errorResponse   =   require('../middlewares/errorResponse');
const responseObject  =   require('../middlewares/responseObject');
const errorHandler    =   require('../middlewares/errorHandler');*/
//const wbm = require('wbm');