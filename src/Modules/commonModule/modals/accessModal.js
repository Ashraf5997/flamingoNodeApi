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
    getRoleByTileId:{}
}

// =============   REGISTRATION =============
accessModel.userRegistration = (reqObj , result) =>
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
               profilePicUrl :null,
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

// ========= LOGIN =============
accessModel.userLogin = (req , result) =>
{
  dbConn.query('SELECT * FROM users LEFT JOIN  profileimg  ON  users.userId = profileimg.userId  WHERE users.usercontact =? ', req.body.usercontact , (err , res)=>{
      if(err)
      {
           result( err, null)
      }else{
           dbConn.query('SELECT * FROM rolepermission LEFT JOIN role On rolepermission.roleId = role.roleId WHERE rolepermission.userId =? ', [res[0].userId] , (err , ress)=>{
                if(err){
                   result( err, null)
                }else{
                    let userData ={
                        userDetail:res,
                        userPermissions:ress
                    }
                    result(null ,userData) 
                    /*let data = ""
                    https.get("https://api.publicapis.org/entries",(resp)=>{
                        resp.on('end', () => {
                            try {
                             
                            } catch (er) {
                                result(null ,userData) 
                            }
                          });

                    })*/
                }
            })
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
