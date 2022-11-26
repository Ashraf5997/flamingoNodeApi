const commonResObj = require('../../middleWares/responses/commonResponse')
const logger          = require('../../../config/logger.js')
const JwtService  =   require('../../services/JwtService');
var path = require('path');
var filename = path.basename(__dirname)+"/"+path.basename(__filename);
var commonServiceUrl = process.env.commonServiceUrl; 

const  ApiErrors= {
/* badRequest:{},
    internalServerError:{},
    success:{}, created:{},
    duplicate:{},
    dataNotFound:{},
*/
    checkBody:{},
    checkParam:{},
    checkError:{},
    checkUserRole:{},
}

ApiErrors.checkUserRole = async(req,res,permission,next)=>{
    let authHeader = req.headers.authorisation; let token;
     if(!authHeader){
         commonResObj(res, 401, { message: process.env.FOUR_ZERO_ONE})
    }else{
        token = authHeader.split(' ')[1]; 
        try{
               let isValidRole = false;
               const roleData = await JwtService.verify(token)
               roleData.permission.forEach((permision)=>{
                   if(permision.roleName == permission[0]){  isValidRole = true ; } 
               })
               if(isValidRole){
                 return isValidRole 
               } else{
                 commonResObj(res, 401, { message: "Not Authorised"})
                 return false;
               }
        }catch(err){
            commonResObj(res, 403, { message: process.env.FOUR_ZERO_THREE })
            return false;
        }
    }
}

ApiErrors.checkError = (value, req ,res, next ) =>{
    if(value.error){
        let errMsg = value.error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        logger.log({ level: "info", message: { file: "middleWares/errors/"+filename, method: "ApiErrors.checkError ,POST  ", error: errMsg, Api :commonServiceUrl+req.url ,status:412} });
        commonResObj(res,412,{error:errMsg })
     }else{ next() }
}

ApiErrors.checkBody = (req,res)=>{
    if(Object.keys(req.body).length === 0){ 
        commonResObj(res,400,{message:" body required "})
    }else{ return true; }    
}

ApiErrors.checkParam = (req,res ,next)=>{
    if(req.query.moduleId && req.query.userId){  return true; } 
    else if(req.params.moduleId){ return true; }
    else if(req.params.userId){ return true; }
    else if(req.query.page && req.query.limit){ return true;  }
    else { commonResObj(res,400,{message:"parameter required "}) }   
}



module.exports = ApiErrors;