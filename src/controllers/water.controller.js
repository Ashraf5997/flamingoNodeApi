const chalk   =    require('chalk');
const log     =    console.log;
const joi         = require('joi')
const waterModel  = require('../models/water.model');
const profileModel  = require('../models/profile.modal');
const JwtService  =   require('../services/JwtService');
const bcrypt  =  require('bcryptjs');
const fast2sms = require('fast-two-sms')
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const errorResponse   =   require('../middlewares/errorResponse');
const responseObject  =   require('../middlewares/responseObject');
const errorHandler    =   require('../middlewares/errorHandler');
const { date, array } = require('joi');

// REGISTRATION FOR WATER SUPPLIER
exports.createAccount = async(req ,resss , next )=>{
    auth (req , resss).then(ress=>{
        if(ress !=" " && resss != null){
             if( ress.accesstype == "SuperAdmin"||ress.accesstype == "WaterSupplier"){
                 waterModel.createAccount(req,(err,data)=>{
                     if(err){
                         console.log("=============== error from water.controller, method : createAccount ===========")
                         console.log(err)
                         if(err.errno == 1062){
                            resss.json({status:404,message:"This shop name is already taken by someone please look for another name" })
                         }else{
                            resss.json({status:500,message:"Server error try after sometime" })
                         }
                     }else{
                          resss.json({status:200,message:"Your Account successfully updated",responseData:data })
                     }
                 })
             }else{
               resss.json({status:401,message:process.env.FOUR_ZERO_ONE })
             }
        }
    }) 
}
// REGISTRATION FOR WATER CUSTOMER
exports.createCustomerAccount = async(req ,resss , next )=>{
    auth (req , resss).then(ress=>{
        if(ress !=" " && resss != null){
             if( ress.accesstype == "SuperAdmin"||ress.accesstype == "WaterSupplier"){
                 waterModel.createCustomerAccount(req,(err,data)=>{
                     if(err){
                         if(err.errno == 1062){
                            resss.json({status:404,message:"This customer is already registerd" })
                         }else{
                            resss.json({status:500,message:"Server error try after sometime" })
                         }
                     }else{
                          resss.json({status:200,message:"Your Customer Account successfully updated",responseData:data })
                     }
                 })
             }else{
               resss.json({status:401,message:process.env.FOUR_ZERO_ONE })
             }
        }
    }) 
}
//  GET TODAYS WATER ORDER BY USER ID 
exports.getUserOrdersByUserIdAndtoday = async(req,ress,next)=>{
    waterModel.getUserOrdersByUserIdAndtoday(req,(err,data)=>{
        if(err){
           console.log("============  Error in water controller in getUserOrdersByUserIdAndtodayr functions ===========")
           console.log(err)
           ress.json({status:500,message:"Server error try after sometimes" })
        }else{
           if(data.length == 0){
               ress.json({status:400,message:"you have not order today",responseData:data })
           }else{
             ress.json({status:200,message:" Today's order fetched successfully ",responseData:data })

           }
        }
    })     
}
//  DELETE  TODAYS WATER ORDER BY USER ID 
exports.deleteUserOrdersByUserIdAndtoday = async(req,ress,next)=>{
    waterModel.deleteUserOrdersByUserIdAndtoday(req.body,(err,data)=>{
        if(err){
           console.log("============  Error in water controller in deleteUserOrdersByUserIdAndtoday functions ===========")
           console.log(err)
           ress.json({status:500,message:"Server error try after sometimes" })
        }else{
             ress.json({status:200,message:" Today's order deleted successfully ",responseData:data })
        }
    })     
}
exports.updateUserOrdersByOrderId = async(req,ress)=>{
    waterModel.updateUserOrdersByOrderId(req,(err,data)=>{
        if(err){
            console.log("============  Error in water controller in updateUserOrdersByOrderId functions ===========")
            console.log(err)
            ress.json({status:500,message:"Server error try after sometimes" })
        }else{
            ress.json({status:200,message:"Order updated successfully ",responseData:data })
        }
    })
}
exports.payUserInvoice = async(req,resss)=>{
    auth (req , resss).then(ress=>{
        if(ress !=" " && resss != null){
                if( resss.accesstype == "SuperAdmin"||ress.accesstype == "WaterSupplier"){
                    waterModel.payUserInvoice(req,(err,data)=>{
                        if(err){
                            console.log("============  Error in water controller in payUserInvoice functions ===========")
                            console.log(err)
                            resss.json({status:500,message:"Server error try after sometime" })
                        }else{
                            if(data.status == 412){
                                resss.json( data)
                            }else{
                                resss.json({status:200,message:"Your Customer Invoice successfully updated",responseData:data })
                            }
                        }
                    })
                }else{
                resss.json({status:401,message:process.env.FOUR_ZERO_ONE })
                }
        }
    })

}
exports.getOrdersBySupIdAndtoday = async (req,ress,next)=>{
    waterModel.getOrdersBySupIdAndtoday(req,(err,data)=>{
        if(err){
              console.log("============  Error in water controller in getOrdersBySupIdAndtoday functions ===========")
              console.log(err)
              ress.json({status:500,message:"Server error try after sometime" })

        }else if (data.length == 0){
            ress.json({status:400,message:"No orders exist",responseData:data })
        }else{
            ress.json({status:200,message:"Your orders is fetched successfully ",responseData:data })
        }
    })
}
// PLACE  WATER ORDRE
exports.placeWaterOrder= async(req ,resss , next )=>{
    auth (req , resss).then(ress=>{
        if(ress !=" " && resss != null){
            if(ress.accesstype == "Admin" || ress.accesstype == "SuperAdmin"|| ress.accesstype == "Customer"|| ress.accesstype == "Delivery" || ress.accesstype == "WaterSupplier"){ 
              var targetDate = new Date();
             // targetDate.setDate(targetDate.getDate() +90);
                  req.body.orderon=targetDate;
                 waterModel.placeWaterOrder(req.body,(err,data)=>{
                     if(err){
                         console.log("============  Error in water controller in placeOrder functions ===========")
                         console.log(err)
                        resss.json({status:500,message:"Server error try after sometime" })

                     }else{
                          resss.json({status:200,message:"Your order is placed successfully ",responseData:data })
                     }
                 })
             }else{
               resss.json({status:401,message:process.env.FOUR_ZERO_ONE })
             }
        }
    })
}
exports.getUserOrdersByUserId= async(req,ress,next)=>{
    let status
    waterModel.getUserOrdersByUserId(req,(err,data)=>{
        if(err){
            ress.json({status:500,message:"Server error try after sometime" })
        }else{
            let tenLtrsData=[],twentyLtrsData=[],monthArray=[] //={"totalAmount":0,"totalCan":0,"totalOrders":0}
                data.forEach((dataObj,index1)=>{
                    monthArray.push(dataObj.month)
                })
                let uniqueMonth =   [...new Set(monthArray)]
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
                var targetDate = new Date();
                let currentMonth = months[targetDate.getMonth()] + ' ' + targetDate.getFullYear();
                data.forEach((monObj)=>{
                         if(currentMonth == monObj.month){
                            if((tenLtrsData.length  == 0)  && ( monObj.ten_ltrs_price != 0 )){
                                let obj ={
                                    totalAmount:parseInt((monObj.ten_ltrs_price==null)?0:monObj.ten_ltrs_price),
                                    totalCan:parseInt((monObj.ten_ltrs_qnty==null)?0:monObj.ten_ltrs_qnty),
                                    totalOrders:1,
                                    month:monObj.month
                                }
                                tenLtrsData.push(obj)
                            }else if(monObj.ten_ltrs_price != 0){
                                tenLtrsData[0].totalAmount = tenLtrsData[0].totalAmount+parseInt((monObj.ten_ltrs_price==null)?0:monObj.ten_ltrs_price),
                                tenLtrsData[0].totalCan    = tenLtrsData[0].totalCan+parseInt((monObj.ten_ltrs_qnty==null)?0:monObj.ten_ltrs_qnty),
                                tenLtrsData[0].totalOrders = tenLtrsData[0].totalOrders+1  
                            }
                           if((twentyLtrsData.length  == 0) && (monObj.twenty_ltrs_price != 0) ){
                                let obj ={
                                    totalAmount:parseInt((monObj.twenty_ltrs_price==null)?0:monObj.twenty_ltrs_price),
                                    totalCan:parseInt((monObj.twenty_ltrs_qnty == null)?0:monObj.twenty_ltrs_qnty),
                                    totalOrders:1,
                                    month:monObj.month
                                }
                                twentyLtrsData.push(obj)
                            }else if(monObj.twenty_ltrs_price != 0){
                                twentyLtrsData[0].totalAmount =  twentyLtrsData[0].totalAmount+parseInt((monObj.twenty_ltrs_price==null)?0:monObj.twenty_ltrs_price),
                                twentyLtrsData[0].totalCan    =  twentyLtrsData[0].totalCan+parseInt((monObj.twenty_ltrs_qnty==null)?0:monObj.twenty_ltrs_qnty),
                                twentyLtrsData[0].totalOrders =  twentyLtrsData[0].totalOrders+1  
                            }
                        }
                })
                //  let orderListArray = {"tenLtrsData":tenLtrsData,"twentyLtrsData":twentyLtrsData}
                // GETING INVOICE 
                let obj={ userId :req.params.userId , month : currentMonth }
                  waterModel.getWaterInvoiceByUserIdAndMonth(obj,(err,InvoiceData)=>{
                    if(err){
                           ress.json({status:404,message:"Server error try later" })
                    }else{
                        if(data.length == 0 && InvoiceData.length == 0){
                           status = 404;
                        }else{
                           status=200
                        }
                        let responseData = {
                            "ALLMONTH" : data,
                            // "ONEMONTH":orderListArray,
                            "UNIQUEMONTH":uniqueMonth,
                            "INVOICEDATA":InvoiceData,
                            "TEN_LTRS_DATA_MONTHLY":tenLtrsData,
                            "TWENTY_LTRS_DATA_MONTHLY":twentyLtrsData,
                            "CURRENTMONTH":currentMonth
                        }
                       ress.json({status:status,message:"Your order list successfully fetched", responseData:responseData })
                    }
                })
        }
    })

}
exports.getUserOrdersByUserIdAndMonth= (req,ress)=>{
    let status ;
    waterModel.getUserOrdersByUserIdAndMonth(req,(err,data)=>{
         if(err){
             ress.json({status:500,message:"Server error try after sometime" })
         }else{ 
            let tenLtrsData=[],twentyLtrsData=[]
            data.forEach((monObj)=>{
                if((tenLtrsData.length  == 0)  && ( monObj.ten_ltrs_price != 0 )){
                    let obj ={
                        totalAmount:parseInt((monObj.ten_ltrs_price==null)?0:monObj.ten_ltrs_price),
                        totalCan:parseInt((monObj.ten_ltrs_qnty==null)?0:monObj.ten_ltrs_qnty),
                        totalOrders:1,
                        month:monObj.month
                    }
                    tenLtrsData.push(obj)
                }else if(monObj.ten_ltrs_price != 0){
                    tenLtrsData[0].totalAmount = tenLtrsData[0].totalAmount+parseInt((monObj.ten_ltrs_price==null)?0:monObj.ten_ltrs_price),
                    tenLtrsData[0].totalCan    = tenLtrsData[0].totalCan+parseInt((monObj.ten_ltrs_qnty==null)?0:monObj.ten_ltrs_qnty),
                    tenLtrsData[0].totalOrders = tenLtrsData[0].totalOrders+1  
                }
               // if((monObj.twenty_ltrs_price != null || monObj.twenty_ltrs_price != undefined || monObj.twenty_ltrs_price != "") && (monObj.twenty_ltrs_price != null || monObj.twenty_ltrs_price!= undefined || monObj.twenty_ltrs != "")  )
                if((twentyLtrsData.length  == 0) && (monObj.twenty_ltrs_price != 0) ){
                    let obj ={
                        totalAmount:parseInt((monObj.twenty_ltrs_price==null)?0:monObj.twenty_ltrs_price),
                        totalCan:parseInt((monObj.twenty_ltrs_qnty == null)?0:monObj.twenty_ltrs_qnty),
                        totalOrders:1,
                        month:monObj.month
                    }
                    twentyLtrsData.push(obj)
                }else if(monObj.twenty_ltrs_price != 0){
                    twentyLtrsData[0].totalAmount =  twentyLtrsData[0].totalAmount+parseInt((monObj.twenty_ltrs_price==null)?0:monObj.twenty_ltrs_price),
                    twentyLtrsData[0].totalCan    =  twentyLtrsData[0].totalCan+parseInt((monObj.twenty_ltrs_qnty==null)?0:monObj.twenty_ltrs_qnty),
                    twentyLtrsData[0].totalOrders =  twentyLtrsData[0].totalOrders+1  
                }
           })
            // GETING INVOICE 
            let obj={ userId :req.body.userId , month : req.body.month }
            waterModel.getWaterInvoiceByUserIdAndMonth(obj,(err,invoiceData)=>{
              if(err){
                     ress.json({status:500,message:"Server error please try later " })
              }else{
                  if(data.length == 0 && invoiceData.length == 0){
                     status = 404;
                  }else{
                     status=200
                  }
                  let responseData = {
                      "TEN_LTRS_DATA": tenLtrsData,
                      "TWENTY_LTRS_DATA":twentyLtrsData,
                      "INVOICEDATA":invoiceData,
                      "MONTHLYDETAILS":data
                 }
                 ress.json({status:status,message:"Your order list successfully fetched", responseData:responseData })
              }
          })
         }
    })
}

exports.getAccount=async(req,resss,next)=>{
    if(req.params.userId == "" || req.params.userId == null || req.params.userId == undefined){
        resss.json({status:422,message:"user Id is required " })
    }else{
        waterModel.getAccount(req,(err,data)=>{
            if(err){
                resss.json({status:500,message:"Server error try after sometime" })
            }else{
                const userObj ={
                    userId        : req.params.userId,
                 }
                  profileModel.GetProfile(userObj , (err , picData)=>{
                      if(err){
                             console.log("========================ERROR FROM WATER CONTROLLER getAccount=================")
                             console.log(err)
                             resss.json({status:409 ,message:'Server error try after sometime' })
                      }else{
                          let responseData ={
                              supplierPicUrl  : picData[0].profilePicUrl,
                              supplierDetails : data 
                          }

                           resss.json({status:200 ,message:' Your Profile is fetched successfully ' ,profileData: responseData })    
                      }  
                  })
            }
        })
    }
}
exports.getCustomerAccount=async(req,resss,next)=>{
    waterModel.getCustomerAccount(req,(err,data)=>{
        if(err){
            resss.json({status:500,message:"Server error try after sometime" })
        }else{
            resss.json({status:200,message:"Your customer list successfully fetched", responseData:data })
        }
    })
}
exports.getWaterSupplierList=async(req,resss,next)=>{
    waterModel.getWaterSupplierList(req,(err,data)=>{
        if(err){
            resss.json({status:500,message:"Server error try after sometime" })
        }else{
            resss.json({status:200,message:"Water supplier list successfully fetched", responseData:data })
        }
    })
}

// FETCHING WATER CUSTOMER DETAILS
exports.getWaterCustomerData=async(req,resss,next)=>{
    waterModel.getWaterCustomerData(req,(err,data)=>{
        if(err){
            resss.json({status:500,message:"Server error try after sometime" })
        }else{
            resss.json({status:200,message:"Water supplier list successfully fetched", responseData:data })
        }
    })
}

// FETCHING INVOICE DATA BY USER ID
exports.getUserInvoice = async (req,res,next)=>{
    console.log(req.params.userId)
    waterModel.getUserInvoice(req,(err,data)=>{
        if(err){
            res.json({status:500,message:"Server error try after sometime" })
        }else{
            res.json({status:200,message:"User invoice successfully fetched", responseData:data })
        }
    })

}


