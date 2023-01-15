//var dbConn = require('../../config/db.config');
var dbConn = require('../../../../config/db.config');

var userMngModel = {

    getAllUsers:{},
    addUser:{},
    updateUser:{},
    searchUser:{},
    getUserById:{},
    deleteUser:{},
    getUsersByAccess:{},

    addRole:{},
    getRoleByUserId:{},
    deleteRole:{},

    addDeliveryPatner:{},
    getDeliveryPatner:{},
    getAllDeliveryPatner:{},
    updateDeliveryPatner:{}
}

// UPDATE  DELIVRY PARTNER
userMngModel.updateDeliveryPatner = async( req, result )=>{
    let updatedon = new Date()
    dbConn.query('UPDATE dlvryptnrlocatn SET status =? ,  lastmodifiedby=? , lastmodifiedon=?   WHERE userId =?' , [ req.body.status ,req.body.modifiedby, updatedon, req.params.userId],(err , res)=>{
        if(err){
             result( err, null)
        }else{
             result(null ,res) 
        }
    })
}

// GET ALL DELIVRY PARTNER
userMngModel.getAllDeliveryPatner = async( req, result )=>{
    let query = " SELECT * FROM dlvryptnrlocatn";
    dbConn.query(query, (err, res)=>{
        if(err){ result(err , null)
        }else{  result(null , res)}
    })
}

// GET DELIVERY PARTNER
userMngModel.getDeliveryPatner = async( req, result )=>{
    let query = " SELECT * FROM dlvryptnrlocatn WHERE userId =?";
    dbConn.query(query,req.params.userId, (err, res)=>{
        if(err){ result(err , null)
        }else{  result(null , res)}
    })
}
// ADD  DELIVERY PARTNER
userMngModel.addDeliveryPatner = async( req , result ) =>{
    let query = "INSERT INTO dlvryptnrlocatn SET?"
    dbConn.query(query  ,req.body, (err, res)=>{
       if(err){
           result(err, null)
       }else{
           result(null, res)
       }
    })
}

// DELETE ROLE BY USER RPID
userMngModel.deleteRole = async( req , result ) =>{
     let query = "DELETE FROM  rolepermission where rpId = ?";
     dbConn.query(query , [req.params.rpId] , (err, res)=>{
        if(err){
          result(err, null)
        }else{
            result(null, res)
        }
     })
}

// GET ROLE BY USER ID
userMngModel.getRoleByUserId = async( req , result) =>{
    let query = " SELECT * FROM  rolepermission  LEFT JOIN role ON rolepermission.roleId = role.roleId LEFT JOIN tiles ON role.tileId = tiles.tileId WHERE rolepermission.userId =? ORDER BY tiles.tileName ASC";
    dbConn.query(query,req.params.userId, (err, res)=>{
        if(err){
            result(err , null)
        }else{
             result(null , res)
        }
    })
}

// ADD ROLE 
userMngModel.addRole = async(req, result) =>{
    console.log("______REQ " , req.body)
    let delQry ="DELETE FROM rolepermission WHERE userId =?";
    dbConn.query(delQry ,[req.params.userId],(err , res)=>{
        if(err){
            result(err , null);
        }else{
            let index= 0;
            req.body.forEach(role=>{
                index++
                dbConn.query('INSERT INTO rolepermission SET?' , role)
            })
            console.log(req.body.length);
            console.log(index)
            if(req.body.length == index){
               // result(null , true);
            }

           // result(null , true);
        }
    })
}

// DELETE USER BY ID 
userMngModel.deleteUser = (req, result)=>{
    let querry = "UPDATE users SET isdeleted ='Y' WHERE userId =?"
    dbConn.query(querry,req.params.id, (err, res)=>{
        if(err){
            result(err , null)
        }else{
             result(null , res)
        }
    })
}
// GET USER BY ID 
userMngModel.getUserById = (req, result)=>{
     let query = " SELECT * FROM  users  WHERE userId =? ";
    dbConn.query(query,req.params.id, (err, res)=>{
        if(err){
            result(err , null)
        }else{
             result(null , res)
        }
    })  
}


// GET USER BY ACCESS TYPE
userMngModel.getUsersByAccess = (req, result)=>{
    let query = " SELECT * FROM  users  WHERE accesstype =? ";
   dbConn.query(query,req.params.accessType, (err, res)=>{
       if(err){
           result(err , null)
       }else{
            result(null , res)
       }
   })  
}

// ========= FETCHING ALL USERS  =============
userMngModel.getAllUsers= (req , result) =>
{
  dbConn.query('SELECT * FROM users ' , (err , res)=>{
      if(err) { result( err, null)
      }else{
            let limit = req.query.limit;
            let page  = req.query.page;
            let totalLength = res.length;
            let totalPage   =  Math.trunc( totalLength/limit );
            let startingLimit = (page - 1) * limit;
            dbConn.query(`SELECT * FROM users  ORDER BY userId DESC LIMIT  ${startingLimit} , ${limit}`  , (err , res)=>{
                if(err){ result( err, null)
                }else{
                    let resObj ={ totalLength : totalLength, totalPage : totalPage ,data:res}
                    result( null, resObj)
                } 
            })
      }
  })
}

// ========= ADD USERS  =============+
userMngModel.addUser= (req , result) =>
{
    let userObj ={
        username:req.body.username,
        usercontact:req.body.usercontact,
        isdeleted:req.body.isdeleted,
        accesstype:req.body.accesstype,
        password:req.body.password,
        createdby:req.body.createdby,
        createdon:new Date(),
    }
    dbConn.query('INSERT INTO users SET?' , userObj , (err , res)=>{
        if(err){ result( err, null)
        }else{
           req.body.selctdMldId.forEach(obj=>{
              let moduleobj={
                userId:res.insertId,
                moduleId : obj.moduleId
              }
                dbConn.query('INSERT INTO modulepermission SET?' ,moduleobj )
           })

            req.body.selctdTileId.forEach(tileObj=>{
                let tileobj={
                userId:res.insertId,
                tileId :tileObj.tileId, 
                moduleId :tileObj.moduleId
                }
                dbConn.query('INSERT INTO tilepermission SET?' ,tileobj )
            })
            const Obj ={
                 userId        :res.insertId,
                 uploadedon    :new Date(),
                 uploadedby    :req.body.username,
                 updatedon     :null,
                 profilePicUrl :null
            }
            dbConn.query('INSERT INTO profileimg SET?' , Obj , (err , res)=>{
                 if(err) {   result( err, null)
                 }else{  result(null ,res)  }
            })

        }
    })
}
// ========= UPDATE USERS  =============
userMngModel.updateUser= (req , result) =>
{
    req.body.isdeleted = ( req.body.isdeleted == true )?"Y":"N";
    req.body.lastModifiedOn = new Date()
    let updateQuery = "UPDATE users  SET username=? , usercontact =?,accesstype =?,isdeleted =? ,lastModifiedBy=? , lastModifiedOn=? WHERE userId =?"
    dbConn.query(updateQuery,[req.body.username,req.body.usercontact,req.body.accesstype,req.body.isdeleted,req.body.lastModifiedBy, req.body.lastModifiedOn ,req.body.userId],(err,res)=>{ 
        if(err) {  result( err, null)
        }else{ let query = "DELETE  FROM modulepermission  WHERE userId = ? ";
            dbConn.query(query,req.body.userId, (err, res)=>{
                if(err){  result(err , null)
                }else{
                    let query = "DELETE  FROM tilepermission  WHERE userId = ? ";
                    dbConn.query(query,req.body.userId, (err, res)=>{
                        if(err){
                            result(err , null)
                        }else{
                            req.body.selctdMldId.forEach(obj=>{
                                let moduleobj={
                                  userId:req.body.userId,
                                  moduleId : obj.moduleId
                                }
                                  dbConn.query('INSERT INTO modulepermission SET?' ,moduleobj )
                             })
                              req.body.selctdTileId.forEach(tileObj=>{
                                  let tileobj={
                                  userId:req.body.userId,
                                  tileId :tileObj.tileId, 
                                  moduleId :tileObj.moduleId
                                  }
                                  dbConn.query('INSERT INTO tilepermission SET?' ,tileobj )
                              })

                            result(null ,res)
                        }
                    })
                }
            })
        }
    })
}

// ========= SEARCH USERS  =============
userMngModel.searchUser= (req , result) =>
{
    let username = req.body.username;
    let usercontact = req.body.usercontact;
    let userId     = req.body.userId;
    let userAccess   = req.body.userAccess;
    let userStatus = req.body.userStatus;
    dbConn.query("SELECT * FROM users WHERE username LIKE '%"+username+"' OR usercontact LIKE '%"+usercontact+"' OR  userId LIKE '%"+ userId+"' OR  accesstype LIKE '%"+ userAccess+"' OR isdeleted LIKE '%"+ userStatus+"' "  , (err , res)=>{
        if(err) { result( err, null)
        }else{ result( null, res) }
    })
}

//*******************    EXPORTING   ***************** */
module.exports = userMngModel;
