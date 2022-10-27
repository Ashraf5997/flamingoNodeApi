
const ApiError = require('../../../middleWares/errors/ApiError')
const acessSchema = require('../schemas/accessSchema');

require("dotenv").config( );
var path = require('path');
//var filename = path.basename(__dirname)+"/"+path.basename(__filename);
//var commonServiceUrl = process.env.commonServiceUrl;

const accessValidation ={

  userRegValidation : {}, // On 01-07-2022
  userLoginValidation : {},
  getRoleByTileId:{},
  getTileByTIdAndMId:{},
  getTileByModuleId:{},
  getTileByUserId:{},
  getModuleByUserId:{}

}
accessValidation.getModuleByUserId = async( req , res , next )=>{
  // if( await  ApiError.checkUserRole(["READ_ROLE"],req,res,next) ){
      if(ApiError.checkParam(req,res)){
         ApiError.checkError( await  acessSchema.getTileByUserId.validate(req.params) ,req,res,next)
      }
  // }
}
accessValidation.getTileByUserId = async( req , res , next ) =>{
   if(ApiError.checkParam(req,res)){
      const value = await  acessSchema.getTileByUserId.validate(req.params)
      ApiError.checkError(value,req,res,next)
   }
}
accessValidation.getTileByModuleId = async(req, res , next )=>{
   if(ApiError.checkParam(req,res)){
      const value = await  acessSchema.getTileByModuleId.validate(req.params)
      ApiError.checkError(value,req,res,next)
   }
}
accessValidation.getTileByTIdAndMId = async(req, res, next)=>{
   if(ApiError.checkParam(req,res)){
      const value = await  acessSchema.getTileByTIdAndMId.validate(req.query)
      ApiError.checkError(value,req,res,next)
}
}
accessValidation.userRegValidation =  async(req,res,next) =>{
   if(ApiError.checkBody(req,res)){
      const value = await  acessSchema.userRegSchema.validate(req.body)
      ApiError.checkError(value,req,res,next)
   }
}
accessValidation.userLoginValidation = async( req, res , next  ) =>{
   if(ApiError.checkBody(req,res)){
      const value = await  acessSchema.userLoginSchema.validate(req.body)
      ApiError.checkError(value,req,res,next)
   }
}
accessValidation.getRoleByTileId = async( req, res , next  ) =>{
   const value = await  acessSchema.getRoleByTileId.validate(req.params)
   ApiError.checkError(value,req,res,next)
 }

 
// ==================MODULE EXPORTING==============
module.exports = accessValidation;

