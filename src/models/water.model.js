const { date } = require('joi');
var dbConn = require('../../config/db.config');
const bcrypt  =  require('bcryptjs');
var waterModel = {
    createAccount:{},
    getAccount:{},
    createCustomerAccount:{},
    getCustomerAccount:{},
    getWaterSupplierList:{},
    getWaterCustomerData:{},
    placeWaterOrder:{},
    getUserOrdersByUserId:{},
    getUserOrdersByUserIdAndMonth:{},
    getWaterInvoiceByUserIdAndMonth:{},
    getUserOrdersByUserIdAndtoday:{}, 
    deleteUserOrdersByUserIdAndtoday:{},
    getOrdersBySupIdAndtoday:{},
    updateUserOrdersByOrderId:{},
    getUserInvoice:{},
    payUserInvoice:{}
    
}

waterModel.createAccount=(req,result)=>{
    let obj = req.body;
    obj.createdon=new Date()
 if(req.params.id=="null"){
      dbConn.query('INSERT INTO watersupplier SET?',[obj],(err,res)=>{
            if(err){
               result( err, null)
            }else{
                result( null, res) 
            }
      })
  }else{ dbConn.query('UPDATE watersupplier SET status=?,twenty_ltrs_amount =?,ten_ltrs_amount=?,userId=?,supplierName=?,supplierContact=?,areaPincode=?,landmark=?,shopName=?,state=?,address1=?,address2=? WHERE id=?',
        [obj.status,obj.twenty_ltrs_amount,obj.ten_ltrs_amount,obj.userId,obj.supplierName,obj.supplierContact,obj.areaPincode,obj.landmark,obj.shopName,obj.state,obj.address1,obj.address2,req.params.id],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
  }
}
waterModel.payUserInvoice =(req,result)=>{
    dbConn.query('SELECT * FROM waterinvoice WHERE id=? ',[req.body.invId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
            if((req.body.dueAmount <= parseInt(res[0].dueAmount)) && (req.body.dueAmount > 0)){
                let status ="";let payedOn = new Date();let payedAmount="";
                let updatedAmount =   parseInt( res[0].dueAmount-req.body.dueAmount);
                if(res[0].payedAmount==null ||res[0].payedAmount== undefined || res[0].payedAmount==""){
                    payedAmount   = parseInt(req.body.dueAmount);
                }else{
                    payedAmount   = parseInt(res[0].payedAmount)+parseInt(req.body.dueAmount);
                }
                if(updatedAmount == 0){
                    status = "paid"
                }else{
                    status = "left amount"
                }
                dbConn.query('UPDATE waterinvoice SET status=?,payedOn=?,dueAmount=?,payedAmount=? WHERE  id=? ',[status,payedOn,updatedAmount,payedAmount,req.body.invId],(err,res)=>{
                    if(err)
                    {    
                         result( err, null)
                    }else{
                        result( null, res)
                    }
                })

            }else{
                result( null, {"status":412,"message":"please enter valid amount "}) 
            }
        }
    })
   
    
    
    
}
waterModel.getAccount =(req,result)=>{
    dbConn.query('SELECT * FROM watersupplier WHERE userId=? ',[req.params.userId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.getUserOrdersByUserIdAndMonth = (req , result)=>{
    dbConn.query('SELECT * FROM waterconsumerorders WHERE userId=? AND month =? ORDER BY id',[req.body.userId,req.body.month],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}

waterModel.getWaterInvoiceByUserIdAndMonth = (req , result)=>{
    dbConn.query('SELECT * FROM waterinvoice  WHERE userId=? AND month =? ORDER BY id',[req.userId,req.month],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.getUserOrdersByUserId=(req,result)=>{
    dbConn.query('SELECT * FROM waterconsumerorders WHERE userId=?  ORDER BY id',[req.params.userId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.getCustomerAccount =(req,result)=>{
    dbConn.query('SELECT * FROM waterconsumer WHERE supplierId=? ',[req.params.userId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.getWaterCustomerData =(req,result)=>{
    dbConn.query('SELECT * FROM waterconsumer WHERE userId=? ',[req.params.userId],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}

waterModel.getWaterSupplierList =(req,result)=>{
    dbConn.query('SELECT * FROM watersupplier ',(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.getUserOrdersByUserIdAndtoday=(req,result)=>{
    let today = new Date().toISOString().slice(0, 10)
    dbConn.query('SELECT * FROM waterconsumerorders WHERE userId=? AND prodname =?',[req.params.userId,today],(err,res)=>{ 
        if(err)
        {
             result( err, null)
        }else{
              result(null ,res)
        }
    })
}
waterModel.updateUserOrdersByOrderId = (req,result)=>{
    dbConn.query('UPDATE waterconsumerorders SET deliveryStatus=? WHERE  id=? ',['delivered',req.params.orderId],(err,res)=>{
        if(err)
        {    
             result( err, null)
        }else{
            result( null, res)
        }
    })
}
waterModel.getOrdersBySupIdAndtoday=(req,result)=>{
    console.log("=============REQ==============")

    console.log(req.params)
    let today = new Date().toISOString().slice(0, 10)
    dbConn.query('SELECT * FROM waterconsumerorders LEFT OUTER JOIN waterconsumer ON waterconsumerorders.userId = waterconsumer.userId JOIN useraddress ON waterconsumerorders.userId = useraddress.userId WHERE waterconsumerorders.supplierId=? AND waterconsumerorders.prodname=? ',[req.params.supId,today],(err,res)=>{ 
        if(err)
        {    
             result( err, null)
        }else{
            console.log("===========================")
            console.log(res)
            result( null, res) 
        }
    })
}
waterModel.getUserInvoice =(req,result)=>{
    dbConn.query('SELECT * FROM waterinvoice WHERE userId=?',[req.params.userId],(err,res)=>{ 
        if(err)
        {    
             result( err, null)
        }else{
            result( null, res)
        }
    })
}
waterModel.deleteUserOrdersByUserIdAndtoday=(req,result)=>{
    dbConn.query('SELECT * FROM waterconsumerorders  WHERE userId=? AND id=?',[req.userId,req.oId],(err,res)=>{ 
        if(err)
        {    
             result( err, null)
        }else if(res.length != 0){
               let month = res[0].month;
               let userId=  res[0].userId;
               let deltAmount=res[0].ten_ltrs_price+res[0].twenty_ltrs_price
                dbConn.query('SELECT * FROM waterinvoice WHERE month =? AND userId =? ',[month,userId],(err,invData)=>{ 
                    if(err)
                    {
                        result( err, null)
                    }else{
                        let totalAmount = invData[0].totalAmount - deltAmount;
                        let dueAmount =  invData[0].totalAmount - deltAmount
                        dbConn.query('UPDATE waterinvoice SET totalAmount=? ,dueAmount=? WHERE userId=? AND month =? ',[totalAmount,dueAmount,userId,month],(err,res)=>{
                            if(err){
                                result( err, null)
                            }else{
                                   dbConn.query('DELETE FROM waterconsumerorders WHERE userId=? AND id=?',[req.userId,req.oId],(err,res)=>{ 
                                        if(err)
                                        {
                                            console.log(err)
                                            result( err, null)
                                        }else{
                                            result(null ,res)
                                        }
                                    })
                            }
                        })
                    }
                })
        }
    })
}
waterModel.createCustomerAccount =(req,result)=>{
    dbConn.query('SELECT * FROM users WHERE usercontact=? ',[req.body.cuscon],(err,resD)=>{ 
        if(err)
        {
             result( err, null)
        }else{
            if(resD.length==0){
                    let  hashedPassword  //bcrypt.hash(req.body.password,10)
                    bcrypt.hash("demo123",10).then(resHash=>{
                        hashedPassword  = resHash
                        const userObj ={
                            username     : req.body.cusname,
                            usercontact  : req.body.cuscon,
                            createdon    : new Date(),
                            password     : hashedPassword,
                            isdeleted:"N",
                            accesstype:"Customer",
                            createdby:req.body.supplierName,
                        }
                        dbConn.query('INSERT INTO users SET?',[userObj],(err,resDD)=>{
                            if(err){
                                result( err, null)
                            }else{
                                const picObj ={
                                    userId        : resDD.insertId,
                                    uploadedon    :new Date(),
                                    uploadedby    :req.body.supplierName,
                                    updatedon     :null,
                                    profilePicUrl :null
                                }
                               dbConn.query('INSERT INTO profileimg SET?' , picObj , (err , res)=>{
                                    if(err)
                                    {
                                         result( err, null)
                                    }else{
                                         //result(null ,res) 
                                            let cusObj = {
                                            userId : resDD.insertId,
                                            supplierId:req.body.supplierId,
                                            name:req.body.cusname,
                                            contact:req.body.cuscon,
                                            createdon:new Date(),
                                            status:"active"
                                            }
                                            dbConn.query('INSERT INTO waterconsumer SET?',[cusObj],(err,res)=>{
                                                if(err){
                                                    result( err, null)
                                                }else{
                                                    result( null, res)
                                                }
                                            })
                                    }
                               })
                               /* */

                            }
                        })
                     })
            }else{
               let userId = resD[0].userId;
               let name   =resD[0].username;
               let cusObj = {
                userId : userId,
                supplierId:req.body.supplierId,
                name:name,
                contact:req.body.cuscon,
                createdon:new Date(),
                status:"active"
             }
             dbConn.query('INSERT INTO waterconsumer SET?',[cusObj],(err,res)=>{
                 if(err){
                     result( err, null)
                 }else{
                     result( null, res)
                 }
             })

            }
        }
    })
}
waterModel.placeWaterOrder =(req,result)=>{
    dbConn.query('INSERT INTO waterconsumerorders SET?',[req],(err,res)=>{
        if(err){
            result( err, null)
        }else{
            dbConn.query('SELECT * FROM waterinvoice WHERE userId =? ',[req.userId],(err,invoicRes)=>{ 
                if(err)
                {
                     result( err, null)
                }else{
                    if(invoicRes.length == 0){
                        let invoiceObj={
                            userId:req.userId,
                            supplierId:req.supplierId,
                            month:req.month,
                            totalAmount:req.twenty_ltrs_price+req.ten_ltrs_price,
                            dueAmount:req.twenty_ltrs_price+req.ten_ltrs_price,
                            status:"unpaid"
                        }
                        dbConn.query('INSERT INTO waterinvoice SET?',[invoiceObj],(err,res)=>{
                            if(err){
                                result( err, null)
                            }else{
                               result(null ,res)
                            }
                        })
                    }else{
                        dbConn.query('SELECT * FROM waterinvoice WHERE month =? AND userId =? ',[req.month,req.userId],(err,res)=>{ 
                            if(err)
                            {
                                 result( err, null)
                            }else{
                                  if(res.length == 0){
                                    let invoiceObj={
                                        userId:req.userId,
                                        supplierId:req.supplierId,
                                        month:req.month,
                                        totalAmount:req.twenty_ltrs_price+req.ten_ltrs_price,
                                        dueAmount:req.twenty_ltrs_price+req.ten_ltrs_price,
                                        status:"unpaid"
                                    }
                                    dbConn.query('INSERT INTO waterinvoice SET?',[invoiceObj],(err,res)=>{
                                        if(err){
                                            result( err, null)
                                        }else{
                                           result(null ,res)
                                        }
                                    })
                                  }else{
                                        let  totalAmount = req.twenty_ltrs_price+req.ten_ltrs_price+parseInt(res[0].totalAmount) 
                                        let  dueAmount    = req.twenty_ltrs_price+req.ten_ltrs_price+parseInt(res[0].dueAmount) 
                                        dbConn.query('UPDATE waterinvoice SET totalAmount=?,status=? ,dueAmount=? WHERE userId=? AND month =? ',[totalAmount,"unpaid",dueAmount,req.userId,req.month],(err,res)=>{
                                            if(err){
                                                result( err, null)
                                            }else{
                                            result(null ,res)
                                            }
                                        })

                                  }
                            }
                        })
                    }
                }
            })
         }
    })
}


module.exports = waterModel;