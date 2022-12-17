//var dbConn = require('../../config/db.config');
const https = require('https')
var dbConn = require('../../../../config/db.config');
var accessModel = {
    userRegistration:{},
    userLogin:{},
    getModuleByUserId:{},
    getTileByUserId:{},
    getTileByModuleId:{},
    getTileList:{},
    getModuleList:{},
    getTileByModuleIdAndUserId:{},
    getRoleByTileId:{},
    verifyContactNumber:{},
    verifyOtp:{},
    deleteOtp:{},
    ressetPassword:{}
}
// =============  RESEET PASSWORD  =============
accessModel.ressetPassword  = ( req , result ) =>{
    dbConn.query('SELECT * FROM users WHERE usercontact=? ', [req.body.contact], (err , res)=>{
        if(err){  result( err, null) }
        else if(res !=""){
            dbConn.query('UPDATE users SET password=? WHERE usercontact=? ', [req.body.password,req.body.contact], (err1 , res1)=>{
                if(err1){ result( err1, null)}
                else{ result( null, {message: `Password updated successfully`}) }
            })
        }
    })
}
// =============   OTP DELETE =============
accessModel.deleteOtp  = ( req , result ) =>{
    dbConn.query('DELETE FROM otp WHERE  otpId=? ', [req.params.otpId], (err , res)=>{
        if(err){  result( err, null) }
        else{
            result( null, {message: `OTP expired`})
        }
    })
}
// =============   OTP VERIFICATION =============
accessModel.verifyOtp  = ( req , result ) =>{
    dbConn.query('SELECT * FROM otp WHERE  otpId=? AND otp=? ', [req.params.otpId, req.params.otp ], (err , res)=>{
        if(err){  result( err, null) }
        else{
            if(res != ""){
                result( null, {message: `OTP verified successfully`,contact: res[0].contact})
            }else{
                result( null, {message: `Invalid OTP`,contact: null})
            }
        }
    })
}
// =============  CONTACT VERIFICATION =============
accessModel.verifyContactNumber = (req , result) =>{
    dbConn.query('SELECT * FROM users WHERE  userContact=? ', req.params.contact , (err , res)=>{
        if(err){  result( err, null) }
        else{
            if(res != ""){
              let otpId =  Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);
                let otpObj={
                    otpId :  otpId,
                    otp   :  Math.floor(100000 + Math.random() * 900000),
                    addedOn  : new Date(),
                    addedBy  : res[0].username,
                    contact  : res[0].usercontact
                }
                dbConn.query('INSERT INTO otp SET?' , otpObj , (err , res)=>{
                    if(err){ result( err, null)
                    }else{
                        console.log("OTP :" , otpObj.otp)
                        result( null, {message: `6 digits otp has sent to  : ${req.params.contact} `,otpId: otpId})
                    }
                })
            }else{
                result( null, {message: `Please enter your registered contact number `,otpId: null}  )
            }
        }
    })
}
// =============   REGISTRATION =============
accessModel.userRegistration = (reqObj , result) =>
{
  dbConn.query('INSERT INTO users SET?' , reqObj , (err , res)=>{
      if(err)
      {
         result( err, null)
      }else{
          const Obj ={
               userId        :res.insertId,
               uploadedon    :new Date(),
               uploadedby    :reqObj.username,
               updatedon     :null,
               profilePicUrl :null,
          }
          dbConn.query('INSERT INTO profileimg SET?' , Obj , (err , res)=>{
               if(err) {
                    result( err, null)
               }else{
                    result(null ,res) 
               }
          })
      }
  })
}

// ========= LOGIN =============
accessModel.userLogin = (req , result) =>
{
  dbConn.query('SELECT * FROM users LEFT JOIN  profileimg  ON  users.userId = profileimg.userId  WHERE users.usercontact =? ', req.body.usercontact , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
        if(res.length > 0){
            dbConn.query('SELECT * FROM rolepermission LEFT JOIN role On rolepermission.roleId = role.roleId WHERE rolepermission.userId =? ', [res[0].userId] , (err , ress)=>{
                if(err){
                   result( err, null)
                }else{
                    let userData ={
                        userDetail:res,
                        userPermissions:ress
                    }
                    result(null ,userData) 
                }
            })
        }else{
            result( null, [])
        }
      } 
  })
}

// ========= FETCHING MODULES  WITH RESPECT OF USERID  =============
accessModel.getModuleByUserId= (req , result) =>
{
  let querry= "SELECT * FROM modulepermission LEFT JOIN modules ON modulepermission.moduleId = modules.moduleId WHERE modulepermission.userId="+req.params.userId+" ORDER BY modules.moduleName ASC ";  
  dbConn.query(querry , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
          result(null ,res)  
      }
  })
}
// ========= FETCHING TILE  WITH RESPECT OF USERID  =============
accessModel.getTileByUserId= (req , result) =>
{
  let querry= "SELECT * FROM tilepermission LEFT JOIN tiles ON tilepermission.tileId = tiles.tileId WHERE tilepermission.userId="+req.params.userId+" ORDER BY tiles.tileName ASC ";  
  dbConn.query(querry , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
          result(null ,res)  
      }
  })
}


// ========= FETCHING MODULES  =============
accessModel.getModuleList= (req , result) =>
{
  dbConn.query('SELECT * FROM modules ' , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
          result(null ,res)  
      }
  })
}

// ========= FETCHING TILES  =============
accessModel.getTileList= (req , result) =>
{
  dbConn.query('SELECT * FROM tiles ' , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
          result(null ,res)  
      }
  })
}

// ========= FETCHING TILES BY MODULE ID  =============
accessModel.getTileByModuleId= (req , result) =>
{   
    let querry= "SELECT * FROM tiles WHERE moduleId =  "+req.params.moduleId;  
    dbConn.query(querry , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{ 
          result(null ,res)  
      }
    })
}

// ========= FETCHING TILES WITH RESPECT OF MODULEID AND USERID  =============
accessModel.getTileByModuleIdAndUserId = (req , result) =>
{   
    let moduleId = req.query.moduleId;
    let userId   = req.query.userId;
    let querry= "SELECT * FROM tilepermission LEFT JOIN tiles ON tilepermission.tileId = tiles.tileId  WHERE tilepermission.moduleId= ? AND tilepermission.userId = ?";  
    dbConn.query(querry , [moduleId,userId],(err , res)=>{
      if(err)
      {
           result( err, null)
      }else{ 
          result(null ,res)  
      }
  })
}
// ========= FETCHING ROLES  WITH RESPECT OF TILE ID  =============
accessModel.getRoleByTileId= (req , result) =>
{
  let querry= "SELECT * FROM role WHERE tileId="+req.params.tileId+" ORDER BY roleName ASC ";  
  dbConn.query(querry , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
          result(null ,res)  
      }
  })
}

//*******************    EXPORTING   ***************** */
module.exports = accessModel;
