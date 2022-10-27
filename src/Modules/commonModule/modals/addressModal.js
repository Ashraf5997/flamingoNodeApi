var dbConn = require('../../../../config/db.config');

var addressModal = {
    getAddresssByPincode:{},
    getDeliveryAddressByUserId:{},
    saveDeliveryAddrs:{}
}
addressModal.getDeliveryAddressByUserId = (req , result)=>{
    dbConn.query("SELECT * FROM deliveryaddress WHERE userId =? ",[req.params.userId] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}

addressModal.saveDeliveryAddrs = (req, result)=>{
    // adding into cart
    req.body.addedon = new Date()
    req.body.lastmodifiedby = null;
    req.body.lastmodifiedon = null;
    dbConn.query('INSERT INTO deliveryaddress SET?' , req.body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res)  }
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
                        let serviceAdd ={pincodeData:res[0] , landmarks : ress }
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