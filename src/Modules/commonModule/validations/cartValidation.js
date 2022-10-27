
const ApiError = require('../../../middleWares/errors/ApiError')
//const acessSchema = require('../schemas/accessSchema');

require("dotenv").config( );
var path = require('path');
//var filename = path.basename(__dirname)+"/"+path.basename(__filename);
//var commonServiceUrl = process.env.commonServiceUrl;

const cartValidation ={

  addCart : {}, 
  deleteCartByUserId : {}, 
  getCartByUserId:{},

}
cartValidation.addCart = async( req , res , next )=>{
  // if( await  ApiError.checkUserRole(["READ_ROLE"],req,res,next) ){
      if(ApiError.checkParam(req,res)){
         ApiError.checkError( await  acessSchema.getTileByUserId.validate(req.params) ,req,res,next)
      }
  // }
}

// ==================MODULE EXPORTING==============
module.exports = cartValidation;