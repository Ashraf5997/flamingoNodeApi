
const ApiError = require('../../../middleWares/errors/ApiError')
//const commonResObj = require('../../../middleWares/responses/commonResponse')
const userSchema = require('../schemas/userSchema');
require("dotenv").config( );
const userValidation ={
  // 1 . TO VALIDATION ADD USER BODY 
  addUserValidation : {}, // On 31-07-2022
  searchUserValidation : {}, // On 31-07-2022
  updateUserValidation : {}, // On 31-07-2022
  getAllUsers:{} ,
  addRole:{},
  deleteRole:{},
  deleteUser:{}

}
userValidation.addRole = async( req , res , next  )=>{
   if(ApiError.checkUserRole(req,res,["WRITE_ROLE"])){
         if(ApiError.checkBody(req,res)){
            next()  
         }
   }
}
userValidation.deleteRole = async( req , res , next  )=>{
   if(ApiError.checkUserRole(req,res,["WRITE_ROLE"])){
       next()     
   }
}
userValidation.deleteUser = async( req , res , next  )=>{
   if(ApiError.checkUserRole(req,res,["WRITE_USER"])){
       next()     
   }
}
userValidation.getAllUsers = async( req , res , next )=>{
      if(ApiError.checkParam(req,res)){
         const value = await  userSchema.getAllUsers.validate(req.query)
         ApiError.checkError(value,req,res,next)
      }
}
userValidation.addUserValidation =  async(req,res,next) =>{
   if(ApiError.checkUserRole(req,res,["WRITE_USER"])){
         if(ApiError.checkBody(req,res)){
            const value = await  userSchema.userAddSchema.validate(req.body)
            ApiError.checkError(value,req,res,next)
         }
   }
}
userValidation.searchUserValidation =  async(req,res,next) =>{
   let boolen  = await ApiError.checkUserRole(req,res,["WRITE_ROLE"])
   if( boolen ){
      if(ApiError.checkBody(req,res)){
         const value = await  userSchema.searchUserSchema.validate(req.body)
         ApiError.checkError(value,req,res,next)
      }
   }
}
userValidation.updateUserValidation =  async(req,res,next) =>{
   if(ApiError.checkUserRole(req,res,["WRITE_USER"])){
      if(ApiError.checkBody(req,res)){
             const value = await  userSchema.updateUserSchema.validate(req.body)
             ApiError.checkError(value,req,res,next)
      }
   }
}
module.exports = userValidation;

