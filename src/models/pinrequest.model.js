var dbConn = require('../../config/db.config');
var pinModel={
    getAllPinRequest:{},
    getAllActPinRequest:{},
    createPinRequest:{},
    getAll:{},
    actPinReq:{},
    genPinReq:{},
    createPaymentHistory:{},
    updateTA:{},
    getPaymentList:{}
}
// FETCHING PAYMENT LIST
pinModel.getPaymentList =(obj, result)=>{
  dbConn.query("SELECT * FROM paymenthistory WHERE userId=? ",[obj.userId],(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}
// CREATE  PIN REQUEST
pinModel.createPinRequest= (reqData , result) =>
{
  dbConn.query("INSERT INTO pin_request SET ?" ,[reqData] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
// GETING  PIN BY USER CONTACT FROM REQ TABLE
pinModel.getAllPinRequest =(obj, result)=>{
    dbConn.query("SELECT * FROM pin_request WHERE userId=?",[obj.usercontact],(err, res)=>{
      if(err){
        result( err, null)
      }else{
        result(null ,res) 
      }
    })
}
// GETING BY USER ID FROM MYPINS TABLE
pinModel.getAllActPinRequest =(obj, result)=>{
  dbConn.query("SELECT * FROM mypins  WHERE userId=? ",[obj.userId],(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}

// GETING ALL PIN REQUEST
pinModel.getAll =(result)=>{
  dbConn.query("SELECT * FROM pin_request",(err, res)=>{
    if(err){
      result( err, null)
    }else{
      result(null ,res) 
    }
  })
}
//UPDATE TA (total amount)
pinModel.updateTA=(reqData,result)=>{
  dbConn.query("UPDATE user_account SET TI=? WHERE userId =?",[reqData.remBlance,reqData.userId],(err,res)=>{ 
    
    if(err)
    {         
        result( err, null)
    }else{
         result(null ,res) 
    }
})
} 

// ACTIVE PIN REQUEST
pinModel.actPinReq=(rData,result)=>{
  dbConn.query("UPDATE pin_request SET actDate=?, activatedBy=?, status=? WHERE id =?", 
  [rData.actDate ,rData.activatedBy, rData.status,rData.id] ,(err,res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

// GENERATING PIN 
pinModel.genPinReq = (req, result)=>{
      for(let i=1 ; i<=req.pinqty;i++){
      let pin ='PIN_' + Math.random().toString(36).substr(2, 99);
      let pinObj ={
          userId :req.userId,
          pin    :pin,
          actDate:new Date(),
          pinStatus :"active",
          rId    :req.rId,
      }
      dbConn.query("INSERT INTO mypins SET ?" ,[pinObj] , (err , res)=>{
          if(err)
          {
              result( err, null)
          }else{
            if( i == req.pinqty){
              result(null ,res) 
            }  
          }
      })
  }
}
// CREATE PAYMENT HISTORY
pinModel.createPaymentHistory= (reqData , result) =>
{
  dbConn.query("INSERT INTO paymenthistory SET ?" ,[reqData] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
// DELETE PIN REQUEST
pinModel.delPinReq= ( id,result) =>
{
  dbConn.query("DELETE  FROM  pin_request WHERE id=?",[id],(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
          // result(null ,res) 
          dbConn.query("DELETE  FROM  mypins WHERE rId=?",[id],(err,res)=>{ 
            if(err)
            {
                 result( err, null)
            }else{
                 result(null ,res) 
            }
        })
      }
  })
}
// SEARCH FRIEND
pinModel.searchFriend= ( regNo,result) =>
{
  dbConn.query("SELECT * FROM register WHERE id=?",[regNo],(err,res)=>{ 
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
// SEND  PIN 
pinModel.sendPin=(rData,result)=>{
  dbConn.query("UPDATE mypins SET userId=? WHERE pin =?", 
  [rData.regNo,rData.sharePin] ,(err,res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}




module.exports= pinModel;