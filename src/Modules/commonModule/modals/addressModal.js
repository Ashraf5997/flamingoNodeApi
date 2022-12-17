var dbConn = require('../../../../config/db.config');

var addressModal = {
    getAddresssByPincode:{},
    getDeliveryAddressByUserId:{},
    saveDeliveryAddrs:{},
    updateDeliveryAddress:{},
    deleteDeliveryAddress:{},
}
addressModal.deleteDeliveryAddress = (req , result)=>{
    dbConn.query("DELETE FROM deliveryaddress WHERE userId =? AND delvryAddId=?  ",[req.params.userId,req.params.delAddId] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}
addressModal.updateDeliveryAddress = (req , result)=>{
    const {houseno,streetno,add1,dist,pincode,landmark,block,state,receivercontact,lastmodifiedby,lastmodifiedon} = req.body
    dbConn.query('UPDATE deliveryaddress SET block=?,dist=?,pincode=?,landmark=?,state=?,streetno=?,houseno=?,add1=?,receivercontact=?,lastmodifiedby=?,lastmodifiedon=? WHERE delvryAddId=? AND userId=? ', 
    [block,dist,pincode,landmark,state,streetno,houseno,add1,receivercontact,lastmodifiedby,lastmodifiedon,req.params.delAddId,req.params.userId], (err1 , res1)=>{
        if(err1){ result( err1, null)}
        else{ result( null, res1) }
    })
}

addressModal.getDeliveryAddressByUserId = (req , result)=>{
    dbConn.query("SELECT * FROM deliveryaddress WHERE userId =? ",[req.params.userId] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}

addressModal.saveDeliveryAddrs = (req, result)=>{
    // Adding into cart
    req.body.addedon = new Date()
    req.body.lastmodifiedby = null;
    req.body.lastmodifiedon = null;
    dbConn.query('INSERT INTO deliveryaddress SET?' , req.body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res) }
    })
}

addressModal.getAddresssByPincode = (req, result )=>{
    dbConn.query("SELECT * FROM serviceaddress WHERE pincode =? AND status = 'Y'",[req.params.pincode] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  
            if(res.length > 0){
                dbConn.query("SELECT * FROM landmarks WHERE SAID =?",[res[0].addressId] ,(err,ress)=>{ 
                    if(err){ result( err, null)
                    }else{ 
                        let serviceAdd ={ pincodeData:res[0] , landmarks : ress }
                        result(null ,serviceAdd);   
                    }
                })
            }else{
                result(null ,res) 
            }
        }
    })
}
//*******************    EXPORTING   ***************** */
module.exports =  addressModal;