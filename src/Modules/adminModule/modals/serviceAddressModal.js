var dbConn = require('../../../../config/db.config');

var serviceAddressModal = {
    getAllServiceAddress: {},
    addServiceAddress: {},
    getServiceAddressById: {},
    updateServiceAddress:{},
    deleteServiceAddress:{},
    searchServiceAddress:{},
     // LANDMARK CONTROLLER FUNCTIONS
     getLandmarkByPincode:{},
     addLandmark:{},
     deleteLandmark:{}
}
     // LANDMARK CONTROLLER FUNCTIONS
serviceAddressModal.addLandmark = (body, result )=>{
    dbConn.query('INSERT INTO landmarks SET?' , body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}
serviceAddressModal.getLandmarkByPincode = (req , result)=>{
    dbConn.query("SELECT * FROM landmarks WHERE pincode= "+[parseInt(req.params.pincode)],(err , res)=>{
        if(err) {result( err, null)
        }else{ result(null ,res) }
    })
}
serviceAddressModal.deleteLandmark = (req, result )=>{
    dbConn.query("DELETE FROM landmarks WHERE landMId=?",[req.params.id],(err,res)=>{ 
        if(err) { result( err, null)
        }else{ result(null ,res)  }
    })
}

// ========= SEARCH SERVICE ADDRESS  =============
serviceAddressModal.searchServiceAddress = (body , result) =>
{
     let  block =  body.block
     let  state =  body.state
     let  dist  =  body.dist
     let  pincode =  body.pincode
     let  status = body.status
     
    dbConn.query("SELECT * FROM serviceaddress WHERE dist LIKE '%"+dist+"' OR block LIKE '%"+block+"' OR pincode LIKE '%"+pincode+"' OR  state  LIKE '%"+ state +"' OR  status LIKE '%"+ status +"' "  , (err , res)=>{
        if(err){ result( err, null)
        }else{ result( null, res) }
    })
}

serviceAddressModal.addServiceAddress = (body, result )=>{
    dbConn.query('INSERT INTO serviceaddress SET?' , body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}

serviceAddressModal.updateServiceAddress = (req,id, result )=>{
    req.lastModifyDate = new Date()
    dbConn.query("UPDATE serviceaddress SET block=?,dist=?,pincode=?,state=?,lastModifiedBy=?,lastModifiedOn=? ,userId=? , status=? WHERE addressId =?",[req.block, req.dist,req.pincode,req.state,req.lastModifiedBy,req.lastModifiedOn,req.userId,req.status,id],(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res)  }
   })
}

serviceAddressModal.getServiceAddressById = (req , result)=>{
    dbConn.query("SELECT * FROM serviceaddress WHERE addressId= "+[req.params.id],(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

serviceAddressModal.getAllServiceAddress = (req , result )=>{
    dbConn.query("SELECT * FROM serviceaddress",(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

serviceAddressModal.deleteServiceAddress = (req, result )=>{
    dbConn.query("DELETE FROM serviceaddress WHERE addressId=?",[req.params.id],(err,res)=>{ 
        if(err) { result( err, null)
        }else{ result(null ,res)  }
    })
}

//*******************    EXPORTING   ***************** */
module.exports =serviceAddressModal;

