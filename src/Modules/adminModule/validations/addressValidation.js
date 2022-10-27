
const ApiError = require('../../../middleWares/errors/ApiError')
const addressSchema = require('../schemas/addressSchema');
//require("dotenv").config( );
const addValidation ={
    addServiceAddress:{},
    searchServiceAddress:{},
    addLandmark:{}
}

addValidation.addServiceAddress = async( req , res , next  )=>{
  if( ApiError.checkUserRole( req,res,["WRITE_SERVICE_ADDRESS"]) ){ if(ApiError.checkBody(req,res)){  ApiError.checkError( await addressSchema.serviceAddSchema.validate(req.body) ,req,res,next ) }  }
}
addValidation.searchServiceAddress = async( req , res , next  )=>{
  if(ApiError.checkUserRole(req,res,["READ_SERVICE_ADDRESS"])){ if(ApiError.checkBody(req,res)){  ApiError.checkError( await addressSchema.searchServiceAddress.validate(req.body) ,req,res,next ) }  }
}
addValidation.addLandmark = async( req , res , next  )=>{ 
   if(await ApiError.checkUserRole(req,res,["WRITE_ROLE"])){if(ApiError.checkBody(req,res)){ next() }   }
}
//////////////////   EXPORTING //////////////////////
module.exports = addValidation;