const { date } = require('joi');
var dbConn = require('../../config/db.config');

var productModel = {

    productUpload:{},
    getAllProduct:{},
    uploadProductImg:{},
    getCategoryList:{},
    updateProductDetail:{},
    deleteProduct:{},
    getQntyList:{},
    getProductDetail:{},
    addToCart :{},
    getFromCart:{},
    removeFromCart:{},
    uploadCtgry:{},
    removeCtgry:{},

}
//UPLOAD PRODUCT
productModel.productUpload =(reqObj,result)=>{
    dbConn.query('INSERT INTO productlist SET?' , reqObj , (err , res)=>{
        if(err) {
             result( err, null)
        }else{
             result(null ,res) 
        }
    })
}
//UPLOAD PRODUCT IMAGE
productModel.uploadProductImg =(reqObj,result)=>{
    dbConn.query("UPDATE productList SET "+[reqObj.label]+"=? WHERE productId =? ",[reqObj.productImg,reqObj.productId],(err,res)=>{ 
        if(err) {         
            result( err, null)
        }else{
             result(null ,res) 
        }
    })
}
//GET ALL PRODUCTsS WHERE PRODUCT IMG IS NULL
productModel.getAllProduct =(result)=>{
   // dbConn.query("SELECT * FROM productlist WHERE productImg = 'NULL' OR ctgryImg ='NULL' OR outOfStockImg ='NULL'OR sizeAImg ='NULL' OR sizeBImg ='NULL'OR sizeCImg ='NULL' OR  sizeDImg ='NULL'",(err , res)=>{
        dbConn.query("SELECT * FROM productlist",(err , res)=>{
        if(err){
             result( err, null)
        }else{
             result(null ,res) 
        }
    })
}
//GET ALL CATEGORY LIST
productModel.getCategoryList =(result)=>{
         dbConn.query("SELECT * FROM productctgrylist",(err , res)=>{
         if(err) {
              result( err, null)
         }else{
              result(null ,res) 
         }
     })
 }
 //GET ALL QNTY LIST
productModel.getQntyList =(result)=>{
    dbConn.query("SELECT * FROM productqntylist",(err , res)=>{
    if(err){
         result( err, null)
    }else{
         result(null ,res) 
    }
})
}
// UPLOAD PRODUCT CATEGORY IMG
productModel.uploadCategoryImg = (reqObj,result)=>{
    dbConn.query("UPDATE productList SET ctgryImg =? WHERE productId =? ",[reqObj.ctgryImg,reqObj.productId],(err,res)=>{ 
        if(err) {         
            result( err, null)
            console.log(err)
        }else{
            console.log(res);
             result(null ,res) 
        }
    })
}
//GET ALL CATEGORY DETAILS
productModel.getCtgryDetail =(req,result)=>{
    dbConn.query("SELECT * FROM productlist WHERE productCtgry=?",[req.params.ctgry],(err , res)=>{
    if(err) {
         result( err, null)
    }else{
         result(null ,res) 
    }
})
}
//UPDATE PRODUCT DETAILS
productModel.updateProductDetail =(req,result)=>{
    dbConn.query("UPDATE productlist SET productName=?,productCtgry=?,productQnty=?,remainingQnty=?,isOutOfStock=?,ratePerKg=? WHERE productId=?",[req.pName,req.pCtgry,req.pQnty,req.pRemQnty,req.pOOS,req.pRate,req.pId],(err , res)=>{
    if(err) {
         result( err, null)
    }else{
         result(null ,res) 
    }
})
} 
//DELETE PRODUCT 
productModel.deleteProduct =(req,result)=>{
    dbConn.query("DELETE  FROM  productlist WHERE productId=?",[req.params.productId],(err,res)=>{ 
    if(err){
         result( err, null)
    }else{
         result(null ,res) 
    }
})
} 
//GET PRODUCT  DETAIL BY PRODUCT NAME
productModel.getProductDetail =(req,result)=>{
    dbConn.query("SELECT *  FROM  productlist WHERE productName=?",[req.params.productName],(err,res)=>{ 
    if(err){
         result( err, null)
    }else{
         result(null ,res) 
      
    }
})
} 
productModel.addToCart =(reqObj,result)=>{
     dbConn.query('INSERT INTO cart SET?' , reqObj , (err , res)=>{
         if(err) {
              result( err, null)
         }else{
              result(null ,res) 
         }
     })
 }
 //GET  FROM CART
productModel.getFromCart =(req,result)=>{
     dbConn.query("SELECT *  FROM cart WHERE userId=?",[req.params.userId],(err,res)=>{ 
     if(err){
          result( err, null)
     }else{
           result(null ,res)
     }
 })
 } 
 //REMOVE   FROM CART
productModel.removeFromCart =(req,result)=>{
     dbConn.query("DELETE  FROM cart WHERE id=?",[req.params.productId],(err,res)=>{ 
     if(err){
          result( err, null)
     }else{
           result(null ,res)
     }
 })
 } 
  //REMOVE   FROM CATEGORY
productModel.removeCtgry =(req,result)=>{
     dbConn.query("DELETE  FROM productctgrylist WHERE ctgryId=?",[req.params.ctgryId],(err,res)=>{ 
     if(err){
          result( err, null)
     }else{
           result(null ,res)
     }
 })
 } 
 //UPLOAD PRODUCT 
productModel.uploadCtgry =(req,result)=>{
    if( req.body.ctgryId=="null"){
      const crObj ={
          uploadedDate : new Date(),
          uploadedBy   : req.body.uploadedBy,
          lastModifyBy : null,
          lastModifyDate : null,
          ctgryName    : req.body.ctgryName,
         // ctgryId      : req.body.ctgryId,
          ctgryImg     : process.env.localhost+`/category/picture/${req.file.filename}`
       }
          dbConn.query("INSERT INTO productctgrylist SET?",[crObj],(err,res)=>{ 
               if(err){
                    result( err, null)
               }else{
                    result(null ,res)
               }
          })
    }else{
     const req ={
          lastModifyBy : req.body.uploadedBy,
          lastModifyDate : new Date(),
          ctgryName    : req.body.ctgryName,
          ctgryId      : req.body.ctgryId,
          ctgryImg     : process.env.localhost+`/category/picture/${req.file.filename}`
       }
         req.lastModifyDate = new Date()
          dbConn.query("UPDATE productctgrylist SET ctgryName=?,ctgryImg=?,lastModifyBy=?,lastModifyDate=? WHERE ctgryId =?",[req.ctgryName,req.ctgryImg,req.lastModifyBy,req.lastModifyDate,req.ctgryId],(err , res)=>{
               if(err){
                    result( err, null)
               }else{
                    result(null ,res) 
               }
          })
    }
 } 
module.exports = productModel;
