
  var dbConn = require('../../config/db.config');
  /*var usersModel = function(user){
       this.Id                =     user.Id;
       this.fullname          =     user.fullname;
       this.email             =     user.email;
       // this.password       =     user.password;
       this.createdby         =     user.createdby;
       this.accesstype         =     user.accesstype;
  }*/
// 
var usersModel = {
     registration:{},
     profilePicUpload:{},
     checkContactNum:{},
     Login:{},
     getAllUsers:{},
     updateUser:{},
     forgotPassword:{},
     resetPassword:{},
     getServiceAddress:{},
     getUserDetails:{},
     updateUserAddress:{},
     getUserAddress:{},
     saveServiceAddress:{},
     deleteServiceAddress:{},
     getLandMark:{},
     deleteLandMark:{},
     createLandMark:{},
}

// REGISTRATION
usersModel.registration = (reqObj , result) =>
{
  dbConn.query('INSERT INTO users SET?' , reqObj , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
         //  result(null ,res) 
          const Obj ={
               userId        :res.insertId,
               uploadedon    :new Date(),
               uploadedby    :reqObj.username,
               updatedon     :null,
               profilePicUrl :null
          }
          dbConn.query('INSERT INTO profileimg SET?' , Obj , (err , res)=>{
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
// UPDATE USER
usersModel.updateUser = (reqData , result) =>
{
      dbConn.query('UPDATE users SET username=?,usercontact=?,accesstype=?,isdeleted=? WHERE userId =?',[reqData.username , reqData.usercontact,reqData.accesstype,reqData.isdeleted,reqData.userId] , (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
}
// PROFILE UPLOAD IMG
usersModel.profilePicUpload = (reqObj , result) =>
{
  dbConn.query('SELECT * FROM profileimg WHERE userId =?',[reqObj.userId],(err,res)=>{
     if(err){
          result( err, null)
     }else{
        if(res==""){
           dbConn.query('INSERT INTO profileimg SET?' , reqObj , (err , res)=>{
               if(err)
               {
                    result( err, null)
               }else{
                    result(null ,res) 
               }
           })
        }else{
          dbConn.query('UPDATE profileimg SET updatedon=?,uploadedby=?,profilePicUrl=?  WHERE userId=?',[reqObj.uploadedon,reqObj.uploadedby,reqObj.profilePicUrl,reqObj.userId] , (err , ress)=>{
               if(err)
               {
                    result( err, null)
               }else{
                    result(null ,ress) 
               }
           })
        }
     }
  })
}

// CHECKING CONTACT NUMBER 
usersModel.checkContactNum=(num,result)=>{
     dbConn.query('SELECT usercontact  FROM  users  WHERE usercontact=?' , num, (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
}
// GET SERVICE  ADDRESS
usersModel.getServiceAddress=(result)=>{
     dbConn.query('SELECT *  FROM  serviceaddress', (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
}
//LOGIN
usersModel.Login = (req , result) =>
{
  dbConn.query('SELECT * FROM users INNER JOIN  profileimg  ON  users.userId = profileimg.userId  WHERE users.usercontact =? ', req.body.usercontact , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           if(res.length <= 0){
               dbConn.query('SELECT * FROM users  WHERE usercontact =? ', req.body.usercontact , (err , res)=>{
                   if(err){
                    result( err, null)
                   }else{
                    result(null ,res) 
                   }
               })
           }else{
               result(null ,res)   
           }
      }
  })
}
// GET ALL USERS
usersModel.getAllUsers = (result)=>{
     dbConn.query('SELECT * FROM  users left JOIN profileimg ON users.userId = profileimg.userId' , (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
}
// FORGOT PASSWORD
usersModel.forgotPassword = (reqData , result) =>
{
  dbConn.query('SELECT * FROM users WHERE usercontact =?' , reqData.contact , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//RESET PASSWORD
usersModel.resetPassword = (reqData , result) =>
{
  dbConn.query('UPDATE users SET password=? WHERE usercontact =?',[reqData.password , reqData.contact] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//GET USER DETAILS
usersModel.getUserDetails= (req , result) =>
{
   dbConn.query('SELECT * FROM  users  WHERE userId=?',[req.params.userId] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
usersModel.saveServiceAddress= (req , result) =>
{
   if(req.body.id =="" || req.body.id ==null || req.body.id==undefined){
     let obj ={
          pincode : req.body.pincode,
          block : req.body.block,
          dist : req.body.dist,
          state : req.body.state
     }
     dbConn.query('INSERT INTO  serviceaddress SET?',[obj] , (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
   }else{
     let data=req.body;
     dbConn.query('UPDATE serviceaddress SET pincode =? ,block=?,dist=?,state=? WHERE id=?',[data.pincode,data.block,data.dist,data.state,data.id] , (err , res)=>{
          if(err)
          {
               result( err, null)
          }else{
               result(null ,res) 
          }
      })
   }
  
}
usersModel.deleteServiceAddress= (req , result) =>
{
   dbConn.query('DELETE FROM  serviceaddress where id=?',[req.params.id] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

//GET USER ADDRESS
usersModel.getUserAddress= (req , result) =>
{
   dbConn.query('SELECT * FROM  useraddress  WHERE userId=?',[req.params.userId] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}

//GET  LANDMARK
usersModel.getLandMark= (req , result) =>
{
   dbConn.query('SELECT * FROM  landmarks  WHERE pincode=?',[req.params.pincode] , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//DELETE  LANDMARK
usersModel.deleteLandMark= (req , result) =>
{
   dbConn.query('DELETE FROM  landmarks  WHERE id=?',[req.params.id],(err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           result(null ,res) 
      }
  })
}
//DELETE  LANDMARK
usersModel.createLandMark= (req , result) =>
{
     if(req.body.id =="" || req.body.id==undefined || req.body.id == null){
          let obj={
               pincode     : req.body.pincode,
               landmark    : req.body.landmark
          }
          dbConn.query('INSERT INTO  landmarks  SET?',[obj],(err , res)=>{
               if(err)
               {
                    result( err, null)
               }else{
                    result(null ,res) 
               }
           })
     }else{
          dbConn.query('UPDATE landmarks SET pincode=?,landmark=? WHERE id=?',[req.body.pincode,req.body.landmark,req.body.id] , (err , ress)=>{
               if(err)
               {
                    result( err, null)
               }else{
                    result(null ,ress) 
               }
           })
     }
  
}
usersModel.updateUserAddress= (obj , result) =>
{
     dbConn.query('SELECT * FROM  useraddress  WHERE userId=?',[obj.userId] , (err , ress)=>{
          if(err)
          {
               result( err, null)
          }else{
               if(ress == ""){
                    dbConn.query('INSERT INTO useraddress SET?' , [obj] , (err , ress)=>{
                         if(err)
                         {
                              result( err, null)
                         }else{
                              result(null ,ress) 
                         }
                     })
               }else{
                    dbConn.query('UPDATE useraddress SET block=?,dist=?,state=?,pincode=?,address1=?,address2=?,address3=?,address4=?,contact=? WHERE userId=?',[obj.block,obj.dist,obj.state,obj.pincode,obj.address1,obj.address2,obj.address3,obj.address4,obj.contact,obj.userId] , (err , ress)=>{
                         if(err)
                         {
                              result( err, null)
                         }else{
                              result(null ,ress) 
                         }
                     })
               }
          }
      })
  
}
module.exports = usersModel;








