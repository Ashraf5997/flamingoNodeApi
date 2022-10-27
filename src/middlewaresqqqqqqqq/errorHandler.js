const { exist } = require("joi");
const reqDataValidator    =   require('../middlewares/reqDataValidator');
require("dotenv").config( );

module.exports= errorHandler = (req,action,res)=>{
  switch(action){
      case"registration":
             return reqDataValidator.registerValidation(req,res)
      case"login":
             return reqDataValidator.login(req,res)
      case"uploadProfilePic":
            return reqDataValidator.uploadProfilePic(req,res)
      case"uploadProduct":
            return reqDataValidator.uploadProductPic(req,res)
      case"updateUser":
            return reqDataValidator.updateUserData(req,res)
      case"forgotPassword":
            return reqDataValidator.forgotPassword(req,res)
      case"uploadProductImg":
            return reqDataValidator.uploadProductImg(req,res)
      case"updateProductDetail":
            return reqDataValidator.updateProductDetail(req,res)
      case"deleteProduct":
            return reqDataValidator.deleteProduct(req,res)
      case"placeOrder":
            return reqDataValidator.placeOrder(req,res)
      case"uploadCtrgy":
            return reqDataValidator.uploadCtrgy(req,res)
     
      break;
  }
}


