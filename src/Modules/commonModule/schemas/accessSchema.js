const joi = require('joi');
const accessSchema = {
  // FOR REGISTER
   userRegSchema   : joi.object({
       username    : joi.string().max(50).required(),
       usercontact : joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
       password    : joi.string().min(6).max(12).required(),
       accesstype  : joi.string().allow(null).required(),
       createdby   : joi.string().allow(null).required(),
   }),
   //  FOR LOGIN 
   userLoginSchema   : joi.object({  
      usercontact : joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
      password    : joi.string().min(6).max(12).required(),
   }),
   // GET ROLE VALIDATION  BY TILE ID
   getRoleByTileId : joi.object({
      tileId: joi.number().required(),
   }),
   // GET TILE BY TID AMD MID 
   getTileByTIdAndMId : joi.object({ 
      moduleId:joi.number().required(),
      userId:joi.number().required(),
   }),
   // GET TILE BY MID 
   getTileByModuleId :joi.object({
      moduleId:joi.number().required(),
   }),
   // GET TILE BY USERID
   getTileByUserId : joi.object({
      userId:joi.number().required(),
   }),
   


}

module.exports = accessSchema;