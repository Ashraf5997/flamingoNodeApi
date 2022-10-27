const orderModel  = require('../models/order.model');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const errorResponse   =   require('../middlewares/errorResponse');
const responseObject  =   require('../middlewares/responseObject');
const errorHandler    =   require('../middlewares/errorHandler');

exports.placeOrder =async(req ,ress , next ) =>{
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
             if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){    
                errorHandler(req,"placeOrder",ress).then(resp=>{ 
                if(resp.status == 422){
                errorResponse("placeOrder",resp,ress)
                }else{
                    orderModel.placeOrder(req.body ,(error , data)=>{
                    try{
                        if(error){
                            errorResponse("placeOrder",error,ress)
                        }else{
                          /*  const accountSid = process.env.TWILIO_ACCOUNT_SID; 
                            const authToken = process.env.TWILIO_AUTH_TOKEN; 
                            const client = require('twilio')(accountSid, authToken); 
                            let data= req.body;
                            client.messages 
                                .create({ 
                                     body:" Hi "+data.orderBy+" you have ordered "+data.items+" items worth "+data.Amount+" will deliver to "+data.address1+" , "+data.address2+" , "+data.address3+" , "+data.address4+" in 30 minutes , orderid : "+data.orderId+" regards : cookfast.com , THANK YOU ! ",
                                     // body: "Hi "+data.orderBy+" you have ordered "+data.items+" items worth "+data.Amount+" will deliver to "+data.address1+","+data.address2+","+data.address3+","+data.address4+" in 30 minutes , details: http://localhost:4200/#/order/id/"+data.orderId+ " regards:cookfast.com, THANK YOU !", 
                                     from: 'whatsapp:+14155238886',       
                                     to: 'whatsapp:+91'+data.contact 
                                   }) 
                                .then() 
                                .done();*/
                            responseObject("placeOrder",data,ress)
                        }
                    }catch(error){
                        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                    }
                  }) 
                }
              })
            }else{
              ress.json({status:499 ,message:'Not Authorised '}) 
            }
        }else{
            console.log("ddsdsdd")
            console.log(res)
        }})
}
exports.getOrder =async(req ,ress , next ) =>{
    orderModel.getOrder(req ,(error , data)=>{
    try{
        if(error){  
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{  
               ress.json({status:200 ,message:"Order details fetched successfully" ,orderData : data})
        }
        }catch(error){
            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }
     }) 
}
exports.getOrderByNo =async(req ,ress , next ) =>{
    orderModel.getOrderByNo(req ,(error , data)=>{
    try{
        if(error){  
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{  
               ress.json({status:200 ,message:"Order details fetched successfully" ,orderData : data})
        }
        }catch(error){
            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }
     }) 
}
exports.getOrderToday =async(req ,ress , next ) =>{

    orderModel.getTodayOrder(req.body ,(error , data)=>{
    try{
        if(error){  
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{  
               ress.json({status:200 ,message:"Today's order details fetched successfully" ,orderData : data})
        }
        }catch(error){
            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }
     }) 
}
exports.deleteOrderToday =async(req ,ress , next ) =>{
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){     
        if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){    
            orderModel.deleteTodayOrder(req ,(error , data)=>{
                    try{
                        if(error){  
                              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                        }else{  
                               ress.json({status:200 ,message:"Order canceled successfully" ,orderData : data})
                        }
                        }catch(error){
                            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                        }
                     })   
             }else{
                ress.json({status:499 ,message:'Not Authorised '}) 
             }
            }
        })
}
exports.getPlacedOrder =async(req ,ress , next ) =>{
    orderModel.getPlacedOrder(req ,(error , data)=>{
    try{
        if(error){  
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{  
               ress.json({status:200 ,message:"Order details fetched successfully" ,orderData : data})
        }
        }catch(error){
            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }
     }) 
}

exports.updateOrder =async(req ,ress , next ) =>{
    auth (req , ress).then(res=>{
        if(res !=" " && res != null){
             if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"){  
                orderModel.updateOrder(req.body ,(error,data)=>{
                    try{
                        if(error){  
                              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                        }else{  
                               ress.json({status:200 ,message:"Order updated successfully" ,orderData : data})
                        }
                        }catch(error){
                            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                        }
                     }) 
             }}})
   
}
exports.getOrderHistory =async(req ,ress , next ) =>{
    orderModel.getOrderHistory(req ,(error , data)=>{
    try{
        if(error){  
              ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{  
               ress.json({status:200 ,message:"Order history fetched successfully" ,orderHistoryData : data})
        }
        }catch(error){
            ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }
     }) 
}