var dbConn = require('../../config/db.config');

var orderModel = {
    placeOrder:{},
    getOrder:{},
    getOrderHistory:{},
    getTodayOrder:{},
    getPlacedOrder:{},
    updateOrder:{},
    getOrderByNo:{},
    getTodayOrder:{},
    deleteTodayOrder:{}
    
}
//UPLOAD PRODUCT
orderModel.placeOrder =(reqObj,result)=>{
 var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
 //   console.log(reqObj)
    reqObj.cartData.forEach(obj => {
        let orderObj={       
            pincode:reqObj.pincode,
            block: reqObj.block,
            dist: reqObj.dist,
            state: reqObj.state,
            contact:reqObj.contact,
            address1:reqObj.address1,
            address2: reqObj.address2,
            address3:reqObj.address3,
            address4:reqObj.address4,
            Amount:reqObj.Amount,
            items:reqObj.items,
            userId:reqObj.userId,
            orderBy:reqObj.orderBy,
            orderOn:reqObj.orderOn,
            orderStatus: reqObj.orderStatus,
            paymentMode:reqObj.paymentMode,
            paymentStatus: reqObj.paymentStatus,
            orderId: reqObj.orderId,
            pName:obj.productName,
            pQnty: obj.productQnty,
            pCtgry: obj.productCtgry,
            pImg: obj.productImg,
            pSize:obj.sizeImg,
            pPrice:obj.productPrice,
            pRate:obj.ratePerKg,
            today:today
        }
        dbConn.query('INSERT INTO orders SET?' , orderObj )
        dbConn.query('SELECT * FROM productlist WHERE productId=?',[obj.productId],(err,res)=>{
            if(err){
               result( err, null)
            }else{
                let remQnty = res[0].remainingQnty;
                let leftQnty = remQnty - obj.productQnty;
                let isOutOfStock="N";
                if(leftQnty <= 0){
                    isOutOfStock = "Y"
                }
                dbConn.query('UPDATE productlist SET remainingQnty=?,isOutOfStock=?  WHERE  productId=?',[leftQnty,isOutOfStock,obj.productId])
            }
       })
    });
    dbConn.query('DELETE FROM cart WHERE  userId=?',[reqObj.userId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })

}
orderModel.getOrder =(req,result)=>{
    
    dbConn.query('SELECT * FROM orders WHERE  orderId=?',[req.params.orderId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
orderModel.getOrderByNo =(req,result)=>{
    
    dbConn.query('SELECT * FROM orders WHERE  id=?',[req.params.id],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
orderModel.getTodayOrder =(req,result)=>{
    dbConn.query('SELECT * FROM orders WHERE userId=? AND today=?',[req.userId,req.today],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
orderModel.deleteTodayOrder =(req,result)=>{
    dbConn.query('DELETE  FROM orders WHERE id=?' ,[req.params.id],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
orderModel.getPlacedOrder =(req,result)=>{
    dbConn.query('SELECT distinct orderId, orderStatus,orderOn FROM orders  WHERE orderStatus="order placed" || orderStatus="on the way"',(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
orderModel.getOrderHistory =(req,result)=>{
    if(req.params.userId == 0000){
        dbConn.query('SELECT distinct orderId, orderStatus,orderOn FROM orders order by orderOn desc ',(err,res)=>{ 
            if(err)
            {
                 result( err, null)
            }else{
                  result(null ,res)
            }
        })
    }else{
        dbConn.query('SELECT distinct orderId, orderStatus,orderOn FROM orders WHERE userId=?',[req.params.userId],(err,res)=>{ 
            if(err)
            {
                 result( err, null)
            }else{
                  result(null ,res)
            }
        })
    }
}
orderModel.updateOrder =(req,result)=>{
    dbConn.query('UPDATE orders SET orderStatus=?,paymentStatus=?  WHERE  orderId=?',[req.orderStatus,req.paymentStatus,req.orderId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
module.exports = orderModel;