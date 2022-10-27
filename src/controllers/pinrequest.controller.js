const pinrequestModel  = require('../models/pinrequest.model');
const chalk   =    require('chalk');
const log     =    console.log;
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const Razorpay = require('razorpay'); 
  exports.generateOrderId=async(req,ress,next)=>{
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
           var instance = new Razorpay({key_id:"rzp_live_fUwOc1PAQYaydE",key_secret:"BcFSNZoSqYJ3LGsFHQUD5oZQ" })
            var options = {
              amount: req.body.amount,  // amount in the smallest currency unit
              currency: "INR",
              receipt: "order_rcptid_11"
            };
            instance.orders.create(options, (err, order)=> {
                if(err){
                    ress.json({status:404 ,message: err})   ; 
                }else{
                    ress.json({status:200 ,message: order}) ;
                }
            });
        }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
  }
  exports.getPaymentList =async(req ,ress , next )=>{
    const userObj ={
      userId      : req.params.userId,
   }
    // calling pinrequestModel
    pinrequestModel.getPaymentList(userObj, (err , data)=>{
        if(err){
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              ress.json({status:200 ,message:' Payment list is fetched successfully ' ,paymentListData:data })    
        }  
    })
}
exports.generateSignature=async(req,ress,next)=>{
   let generated_signature = hmac_sha256(req.body.orderId + "|" + req.body.paymentId, process.env.key_secret);
    if (generated_signature == req.body.signatureId) {
       ress.json({status:200 ,message:' PAYMENT SUCCESSFUL'})       
    }else{
        ress.json({status:404 ,message:' PAYMENT NOT SUCCESSFUL'})       
    }
}
exports.createPinRequest = async(req ,ress , next )=>{
     const userObj ={
         username      : req.body.username,
         userId        : req.body.userId,
         usercontact   : req.body.contact,
         pinqty        : req.body.TP,
         tId           :"Amount=" +req.body.TID+" "+"PAID BY="+req.body.payedBy+" "+"PAYMENT ID="+req.body.payId,
         reqDate       : new Date(),
         actDate       : new Date(),
         status        :"active",
         activatedBy   :"Self", 
     }
     auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if(res.accesstype == "Customer" || res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.createPinRequest(userObj , (err , data)=>{
                if(err){
                   ress.json({status:409 ,message:'SERVER ERROR TRY LATER' }) 
                    }else{
                   //  console.log(data.insertId)
                     let reqBody={
                        userId  : req.body.userId,
                        pinqty  : req.body.TP,
                        rId     :data.insertId
                     }
                  //  ress.json({status:200 ,message:' Request sent for verification , please wait while we process  ,   ' ,accountData:data})
                        pinrequestModel.genPinReq(reqBody, (err , data)=>{
                            if(err){
                                    ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST GENERATING  ' }) 
                                }else{
                                    let reqbody={
                                        username      :req.body.username,
                                        userId        :req.body.userId,
                                        usercontact   :req.body.contact,
                                        payedfor      :req.body.payedfor,
                                        payedon       :new Date(),
                                        payId         :req.body.payId,
                                        orderId       :req.body.orderId,
                                        signId        :req.body.signId,
                                        payedamount   :req.body.TID,
                                        payedBy       :req.body.payedBy,
                                        pinQnty       :req.body.TP
                                    }
                                    pinrequestModel.createPaymentHistory(reqbody, (err , data)=>{
                                        if(err){
                                            ress.json({status:409 ,message:'SERVER ERROR FOR GENERATING PAYMENT HISTORY' }) 
                                        }else{
                                            if(req.body.payedBy =="wallet amount"){
                                                 let remBlance = req.body.walletAmount - req.body.TID
                                                 let obj={
                                                    remBlance:remBlance,
                                                    userId :req.body.userId,
                                                 }
                                                 pinrequestModel.updateTA(obj,(err,data)=>{
                                                     if(err){
                                                         console.log(err)
                                                          ress.json({status:409 ,message:'SERVER ERROR FOR UPDATING TOTAL AMOUNT' }) 
                                                         
                                                     }else{
                                                       ress.json({status:200 ,message:' YOUR PIN IS GENERATED SUCCESSFULLY !' ,pinRequestData:data})       
                                                     }
                                                 })
                                            }else{
                                              ress.json({status:200 ,message:' YOUR PIN IS GENERATED SUCCESSFULLY !' ,pinRequestData:data})       
                                            }
                                        }
                                    })
                            }      
                        })  
                    }  
            })
        }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }

 exports.getAllPinRequest =async(req ,ress , next )=>{
      const userObj ={
        usercontact       : req.params.usercontact,
     }
      // calling profileModel 
      pinrequestModel.getAllPinRequest(userObj, (err , data)=>{
          if(err){
                 ress.json({status:404 ,message:'Server Error Try Later' })
          }else{
                ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
          }  
      })
 }
 exports.getAllActPinRequest =async(req ,ress , next )=>{
    const userObj ={
       userId: req.params.userId,
    }
    // calling profileModel 
    pinrequestModel.getAllActPinRequest(userObj, (err , data)=>{
        if(err){
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              ress.json({status:200 ,message:' Pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}
 // FETCHING ALL PIN REQUEST
 exports.getAll =async(req ,ress , next )=>{
    // calling profileModel 
    pinrequestModel.getAll( (err , data)=>{
        if(err){
               ress.json({status:404 ,message:'Server Error Try Later' })
        }else{
              ress.json({status:200 ,message:'All pin request is fetched successfully ' ,pinRequestData:data })    
        }  
    })
}

// ACTIVE PIN REQUEST
exports.actPinReq = async(req ,ress , next )=>{
     const userObj = {
         id: req.body.rId,
         activatedBy: req.body.username,
         actDate    : new Date(),
         status     :"active"
     }
       // calling accountModel 
       //Authentication
      auth (req , ress).then(res=>{
        if(res !=" " && res != null){
          if( res.accesstype == "Manager" || res.accesstype == "Admin"){
            pinrequestModel.actPinReq(userObj , (err , data)=>{
                if(err){
                        ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST UPADATING  ' }) 
                    }else{
                        pinrequestModel.genPinReq(req, (err , data)=>{
                            if(err){
                                    ress.json({status:409 ,message:'SERVER ERROR FOR PIN REQUEST GENERATING  ' }) 
                                }else{
                                    ress.json({status:200 ,message:' PIN REQUEST IS GENERATED SUCCESSFULLY !  ' ,pinRequestData:data})  
                            }      
                        })
                }   
            })
        }else{
                ress.json({status:401 ,message:'Not Authorised '})   ; 
        }
     }
  })
 }
 // DELETE PIN REQUEST
exports.delPinReq = async(req ,ress , next )=>{
      let id = req.params.id;
     auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if( res.accesstype == "Manager" || res.accesstype == "Admin"){
           pinrequestModel.delPinReq(id , (err , data)=>{
               if(err){
                       ress.json({status:409 ,message:'SERVER ERROR ON PIN REQUEST DELETING  ' }) 
                   }else{
                       ress.json({status:200 ,message:'PIN REQUEST IS DELETED  SUCCESSFULLY ! ' }) 
               }  
           })
       }else{
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
    }
 })
}

// SEARCH FRIENDS
exports.searchFriend = async(req ,ress , next )=>{
    let regNo = req.params.regNo;
    console.log(regNo)
         pinrequestModel.searchFriend(regNo , (err , data)=>{
             if(err){
                    ress.json({status:409 ,message:'SERVER ERROR' }) 
             }else if(data==""){
                     ress.json({status:404 ,message:'INVALID REGISTRATION NUMBER ! ' }) 
             } else{
                ress.json({status:200 ,message:'FRIEND FETCH SUCCESSFULLY  ! ' ,userData:data}) 
             } 
         })
}

// SEND PIN 
exports.sendPin = async(req ,ress , next )=>{
    const userObj = {
        regNo: req.body.friendRegNo,
        sharePin: req.body.sharePin,
    }
      //Authentication
     auth (req , ress).then(res=>{
       if(res !=" " && res != null){
         if( res.accesstype == "Manager" || res.accesstype == "Admin" || res.accesstype=="Customer"){
           pinrequestModel.sendPin(userObj , (err , data)=>{
               if(err){
                   ress.json({status:409 ,message:'SERVER ERROR' }) 
               }else if(data==""){
                   ress.json({status:404 ,message:'INVALID REGISTRATION NUMBER ! ' }) 
               } else{
                   ress.json({status:200 ,message:'SEND SUCCESSFULLY  ! ' ,userData:data}) 
               } 
           })
       }else{
               ress.json({status:401 ,message:'Not Authorised '})   ; 
       }
    }
 })
}
