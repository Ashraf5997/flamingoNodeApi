var dbConn = require('../../../../config/db.config');

var productModal = {
    addProduct: {},
    updateProduct: {},
    deleteProduct: {},
    getAllProduct:{},
    getProductById:{},
    searchProduct:{}
}
// ========= SEARCH PRODUCT  =============
productModal.searchProduct = (req , result) =>
{
     let  productName  = req.body.productName
     let  productCtgry =req.body.productCtgry
     let  addedon      =  req.body.addedon
     let  addedby      =  req.body.addedby
     let  isOutOfStock =  req.body.isOutOfStock;
    dbConn.query("SELECT * FROM productlist WHERE productName LIKE '%"+productName+"' OR productCtgry LIKE '%"+productCtgry+"' OR  isOutOfStock LIKE '%"+ isOutOfStock+"' OR  addedon  LIKE '%"+ addedon +"' OR  addedby LIKE '%"+ addedby+"' "  , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{
            result( null, res)
        }
    })
}

productModal.addProduct = (body, result )=>{
    dbConn.query('INSERT INTO productlist SET?' , body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}

productModal.updateProduct = (req,id, result )=>{
    req.lastModifyDate = new Date()
    dbConn.query("UPDATE productlist SET productName=?,productCtgry=?,productQnty=?,remainingQnty=?,isOutOfStock=?,ratePerKg=? ,lastModifyBy=?, lastModifyDate=?,userId=? , unit=? WHERE productId =?",[req.productName, req.productCtgry,req.productQnty,req.remainingQnty,req.isOutOfStock,req.ratePerKg,req.lastModifyBy,req.lastModifyDate,req.userId,req.unit,id],(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res)  }
   })
}

productModal.getProductById = (req , result)=>{
    dbConn.query("SELECT * FROM productlist WHERE productId= "+[req.params.id],(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

productModal.getAllProduct = (req , result )=>{
    dbConn.query("SELECT * FROM productlist",(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

productModal.deleteProduct = (req, result )=>{
    dbConn.query("DELETE FROM productlist WHERE productId=?",[req.params.id],(err,res)=>{ 
        if(err) { result( err, null)
        }else{ result(null ,res)  }
    })
}

//*******************    EXPORTING   ***************** */
module.exports =productModal;

