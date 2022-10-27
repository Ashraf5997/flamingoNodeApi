const chalk   =    require('chalk');
const log     =    console.log;
const joi         = require('joi')
const usersModel  = require('../models/users.model');
const JwtService  =   require('../services/JwtService');
const bcrypt  =  require('bcryptjs');
const fast2sms = require('fast-two-sms')
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const errorResponse   =   require('../middlewares/errorResponse');
const responseObject  =   require('../middlewares/responseObject');
const errorHandler    =   require('../middlewares/errorHandler');
//const wbm = require('wbm');
// REGISTRATION
exports.registration = async(req ,ress , next )=>{
      errorHandler(req,"registration",ress).then(resp=>{
            if(resp.status ==422){
              errorResponse("register",resp,ress)
            }else{
              let  hashedPassword  //bcrypt.hash(req.body.password,10)
              bcrypt.hash(req.body.password,10).then(resHash=>{
                hashedPassword  = resHash
                const userObj = {
                    username :req.body.username,
                    usercontact  :req.body.usercontact,
                    createdon : new Date(),
                    password : hashedPassword,
                    isdeleted:req.body.isdeleted,
                    accesstype:req.body.accesstype,
                    createdby:req.body.createdby,
                }
                // calling usersModel 
                usersModel.registration(userObj ,(error , data)=>{
                    try{
                      if(error){
                        errorResponse("register",error,ress)
                      }else{
                        let API_KEY = process.env.API_KEY;
                        var password = req.body.password
                        let message = "Hi : "+req.body.username+" your password is "+password+" do not share with others regards: www.cookfast.in, THANKS";
                        //  const response =  fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[req.body.usercontact]})
                        responseObject("register",data,ress)
                      }
                    }catch(error){
                        log(chalk.red("================= catch error ==============="))
                        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                    }
                }) 
              })
            }  
       })
}
// UPDATE USER
// Ashraf Ja
exports.updateUser = async(req ,resss , next )=>{
  auth (req , resss).then(ress=>{
    if(ress !=" " && ress != null){
         if(ress.accesstype == "Admin" || ress.accesstype == "SuperAdmin"||ress.accesstype == "Customer" ||ress.accesstype == "Delivery" ||ress.accesstype == "WaterSupplier"){
            const userObj ={
              username :req.body.username,
              usercontact  :req.body.usercontact,
              isdeleted:req.body.isdeleted,
              accesstype:req.body.useraccess,
              userId:req.body.userid
            }
            // calling usersModel 
            usersModel.updateUser(userObj ,(error , data)=>{
                try{
                  if(error){
                      resss.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                  }else if(data){
                    resss.json({status:200 ,message:"User data successfully updated" })
                  }
                }catch(error){
                    resss.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                }
            }) 
          }else{
            resss.json({status:401,message:process.env.FOUR_ZERO_ONE })
          }
    }
  })
}
// UPLOAD PROFILE PIC 
exports.uploadProfilePic =async(req ,resss , next ) =>{
  auth (req , resss).then(ress=>{
    if(ress !=" " && ress != null){
         if(ress.accesstype == "Admin" || ress.accesstype == "SuperAdmin"||ress.accesstype == "Customer" ||ress.accesstype == "Delivery" ||ress.accesstype == "WaterSupplier"){
            errorHandler(req,"uploadProfilePic",resss).then(resp=>{
            if(resp.status == 422){
              errorResponse("uploadProfilePic",resp,resss)
            }else{
              const userObj ={
                userId        :req.body.userId,
                uploadedon    :new Date(),
                uploadedby    :req.body.uploadedby,
                updatedon     :null,
                profilePicUrl :process.env.localhost+`/profile/picture/${req.file.filename}`
              }
              // calling usersModel 
              usersModel.profilePicUpload(userObj ,(error , data)=>{
                  try{
                    if(error){
                         errorResponse("uploadProfilePic",error,resss)
                    }else{
                      if(data.affectedRows == 1){
                         resss.json({status:200 ,message:'Profile picture uploaded ',responseData:userObj})    
                         //  responseObject("uploadProfilePic",userObj,ress)
                      }
                    }
                  }catch(error){
                      resss.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                  }
              }) 
            }
          })
        }else{
          resss.json({status:499 ,message:'Not Authorised '}) 
         }
        }
    })
}

// GET OTP FOR REGISTRATION
exports.getOtp = async(req ,res)=>{
  let number = req.params.contactnumber;
  usersModel.checkContactNum(number,(err,data)=>{
    if(err){
        res.json({status:500 ,message:"Server error try after sometime " }) 
    }else if (data.length >0){
      res.json({status:409,message:number+" is already exist" }) 
    }else{
      var otp = Math.floor(1000 + Math.random() * 9000);
      let API_KEY = process.env.API_KEY;
      let message = "Your 4 digits otp is : "+otp+" do not share with others regards: www.cookfast.in, THANKS";
      const response = fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})
      if(response.return = true){
         console.log("------------OTP------------")
         console.log(otp)
          res.json({status:200 ,message:'4 digits otp has sent to your registered contact number  ' ,otp:otp }) 
      }else{
          res.json({status:409 ,message:"Server error try after sometime " }) 
      }
     /* let API_KEY = process.env.API_KEY;
      var otp = Math.floor(1000 + Math.random() * 9000);
      let message = "Your 4 digits otp  is : "+otp+" do not share with others regards: www.cookfast.com, THANKS";
      const response =  fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})
      //if(response.return = true){
        if(true){
          res.json({status:200 ,message:otp })  
      }else{
         res.json({status:500 ,message:"Server error try after sometime " }) 
      }*/
    }
  })
} 
// LOGIN 
exports.login = async(req ,ress , next )=>{
  errorHandler(req,"login",ress).then(resp=>{
    if(resp.status == 422 ){
      errorResponse("login",resp,ress)
    }else{
      usersModel.Login(req, (err , data)=>{
        try{
          if(err){
            errorResponse("login",err,ress)
          }else if(data !=""){ 
            bcryptedPassword = data[0].password;
            bcrypt.compare(req.body.password , bcryptedPassword ,(err , result )=>{  
               if(result){
                  access_token= JwtService.sign({id:data[0].userId , accesstype : data[0].accesstype, fullname:data[0].username})
                  ress.status(200).json({message:'Access Verified' ,userData:data ,access_token}) 
                }else{
                  return ress.status(403).json({ message:'Access Denied Invalid Credentials' })
                }
             })
          }else{
            ress.status(403).json({message:'Access Denied Invalid Credentials'})    
          }
        }catch(error){
            ress.status(500).json({
              message:process.env.FIVE_ZERO_ZERO , error:error})
        }
    })     
    }
  })
}

// GET ALL USERS
exports.getAllUsers = async(req ,ress , next )=>{
 usersModel.getAllUsers((err,data)=>{
     if(err){
      ress.json({status:500 ,message:'Server error try later'})    
     }else if(data.length >0){
        ress.json({status:200 ,message:'user list fetched successfully',userData:data})    
     }else{
        ress.json({status:400 ,message:'user list not found'})    
     }
 })
}

// SAVE SERVICE ADDRESS
exports.saveServiceAddress = async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
    if(ress !=" " && ress != null){
         if(res.accesstype == "SuperAdmin"){
          usersModel.saveServiceAddress(req,(err,data)=>{
              if(err){
                if(err.errno = 1062){
                  ress.json({status:409 ,message:"Pincode "+process.env.FOUR_ZERO_NINE})      
                }else{
                  ress.json({status:500 ,message:'Server error try later'})    
                }
              }
              else{
                ress.json({status:200 ,message:' Service address saved successfully'})    
              }
          })
         }else{
          ress.json({status:401 ,message:process.env.FOUR_ZERO_ONE })
         }
        }
     })
 }
 
// DELETE SERVICE ADDRESS
exports.deleteServiceAddress = async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
    if(ress !=" " && ress != null){
         if(res.accesstype == "SuperAdmin"){
          usersModel.deleteServiceAddress(req,(err,data)=>{
              if(err){
                 ress.json({status:500 ,message:'Server error try later'})    
              }
              else{
                ress.json({status:200 ,message:' Service address deleted successfully'})    
              }
          })
         }else{
          ress.json({status:401 ,message:process.env.FOUR_ZERO_ONE })
         }
        }
     })
 }

// GET SERVICE ADDRESS
exports.getServiceAddress = async(req ,ress , next )=>{
  usersModel.getServiceAddress((err,data)=>{
      if(err){
       ress.json({status:500 ,message:'Server error try later'})    
      }else if(data.length >0){
         ress.json({status:200 ,message:'Service address list fetched successfully',userData:data})    
      }else{
         ress.json({status:400 ,message:'Service address list not found'})    
      }
  })
 }
// FORGOT PASSWORD

exports.forgotPassword = async(req ,res , next )=>{
        const {contact } = req.body;
        const userObj ={
            contact,
        }
        // calling usersModel 
        usersModel.forgotPassword(userObj , (err , data)=>{
            try{
              if(err){
                errorResponse("forgotPassword",err,ress)
              }else if(data ==""){
                res.json({status:404 ,message:'Contact not found' ,Data:data})   
              }
              else{
                  var otp = Math.floor(1000 + Math.random() * 9000);
                  let number = userObj.contact;
                  let API_KEY = process.env.API_KEY;
                  let message = "Your 4 digits otp for reset-password is : "+otp+" do not share with others regards: www.enterpricebc.com, THANKS";
                  const response = fast2sms.sendMessage({authorization:API_KEY,message:message,numbers:[number]})
                  if(response.return = true){
                      res.json({status:200 ,message:'4 digits otp has sent to your registered contact number  ' ,otp:otp }) 
                  }else{
                      res.json({status:409 ,message:"Server error try after sometime " }) 
                  }
              }
            }catch(err){
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO , error:error})
        
            }
      })
}
// RESET PASSWORD
exports.resetPassword = async(req ,res , next )=>{
  const {password,contact } = req.body;
  const hashedPassword = await bcrypt.hash(password,10)
   const userObj ={
       password:hashedPassword,
       contact
   }
    usersModel.resetPassword(userObj , (err , data)=>{
        if(err){
           res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
        }
        else{ 
         res.json({status:200 ,message:' Your password has been  reset successfully , please sign-in '}) 
        }
    })
 }

 // GET USER DETAILS
exports.getUserDetails = async(req ,res , next )=>{
    usersModel.getUserDetails(req , (err , data)=>{
        if(err){
           res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
        }
        else{ 
         res.json({status:200 ,message:'User details fetched  successfully ',responseData:data}) 
        }
    })
 }
 // GET USER ADDRESS
 exports.getUserAddress = async(req ,res , next )=>{
  usersModel.getUserAddress(req , (err , data)=>{
      if(err){
         res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
      }
      else{ 
       res.json({status:200 ,message:'User address fetched successfully ',responseData:data}) 
      }
  })
}
 //UPDATE USER ADDRESS
 exports.updateUserAddress = async(req ,res )=>{
  auth (req , res).then(ress=>{
    if(ress !=" " && ress != null){
         if(ress.accesstype == "Admin" || ress.accesstype == "SuperAdmin"||ress.accesstype == "Customer" ||ress.accesstype == "Delivery" ||ress.accesstype == "WaterSupplier"){
          usersModel.updateUserAddress(req.body , (err , data)=>{
              if(err){
                res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
              }
              else{ 
              res.json({status:200 ,message:'User addresss update successfully ',responseData:data}) 
              }
          })
         }else{
          res.json({status:499 ,message:'Not Authorised '}) 
         }
    }})
}
 // GET USERDETAILS
 exports.getUserDetails = async(req ,res , next )=>{
  usersModel.getUserDetails(req , (err , data)=>{
      if(err){
         res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
      }
      else{ 
       res.json({status:200 ,message:'User details fetched  successfully ',responseData:data}) 
      }
  })
}

// GET  LANDMARK 
exports.getLandMark = async(req ,res , next )=>{
  usersModel.getLandMark(req , (err , data)=>{
      if(err){
         res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
      }
      else{ 
       res.json({status:200 ,message:'landmark fetched  successfully ',responseData:data}) 
      }
  })
}
// POST  LANDMARK 
exports.createLandMark = async(req ,res , next )=>{
  auth (req , res).then(ress=>{
    if(ress !=" " && ress != null){
         if(ress.accesstype == "SuperAdmin"){
          usersModel.createLandMark(req , (err , data)=>{
            if(err){
              if(err.errno = 1062){
                res.json({status:409 ,message:"Landmark "+process.env.FOUR_ZERO_NINE})      
              }else{
                res.json({status:500 ,message:'Server error try later'})    
              }
            }
            else{ 
             res.json({status:200 ,message:'landmark created successfully ',responseData:data}) 
            }
          })
      }else{
        res.json({status:499 ,message:'Not Authorised '}) 
      }
    }
  })
}

// DELETE  LANDMARK 
exports.deleteLandMark = async(req ,res , next )=>{
  auth (req , res).then(ress=>{
    if(ress !=" " && ress != null){
         if(ress.accesstype == "SuperAdmin"){
            usersModel.deleteLandMark(req , (err , data)=>{
              if(err){
                res.json({status:500 ,message:'SERVER ERROR' ,errData:err}) 
              }
              else{ 
              res.json({status:200 ,message:'landmark deleted successfully ',responseData:data}) 
              }
            })
         }else{
             res.json({status:499 ,message:'Not Authorised '}) 
         }
        }
  })
 
}
