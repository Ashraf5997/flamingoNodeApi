const chalk   =    require('chalk');
const log     =    console.log;
//const joi         = require('joi')
const productModel  = require('../models/product.model.js');
//const JwtService  =   require('../services/JwtService');
//const bcrypt  =  require('bcryptjs');
//const fast2sms = require('fast-two-sms')
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
const errorResponse   =   require('../middlewares/errorResponse');
const responseObject  =   require('../middlewares/responseObject');
const errorHandler    =   require('../middlewares/errorHandler');

// UPLOAD PRODUCT
exports.uploadProduct=async(req ,ress , next ) =>{
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
            errorHandler(req,"uploadProduct",ress).then(resp=>{
            if(resp.status ==422){
              errorResponse("uploadProduct",resp,ress)
            }else{
              const productObj ={
                productName   :req.body.productName,
                productCtgry  :req.body.productCtgry,
                productImg    :req.body.productImg,
                sizeAImg      :req.body.sizeAImg,
                sizeBImg      :req.body.sizeBImg,
                sizeCImg      :req.body.sizeCImg,
                sizeDImg      :req.body.sizeDImg,
                ctgryImg      :req.body.ctgryImg,
                productQnty   :req.body.productQnty,
                addedon       :new Date(),
                addedby       :req.body.addedby,
                userId        :req.body.userId,
                outOfStockImg :req.body.outOfStockImg,
                remainingQnty :req.body.remainingQnty,
                isOutOfStock  :req.body.isOutOfStock,
                ratePerKg     :req.body.ratePerKg
              }
              productModel.productUpload(productObj ,(error , data)=>{
                  try{
                    if(error){
                         errorResponse("uploadProduct",error,ress)
                    }else{
                      if(data.affectedRows == 1){
                         responseObject("uploadProduct",data,ress)
                    }
                  }
                  }catch(error){
                      ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                  }
              }) 
            }
          })
         }else{
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
        }})
}
// GET ALL PRODUCT
exports.getAllProduct= async(req ,ress , next )=>{
  productModel.getAllProduct((err,data)=>{
      if(err){
       ress.json({status:500 ,message:'Server error try later'})    
      }else if(data.length >0){
         ress.json({status:200 ,message:'Product list fetched successfully',productData:data})    
      }else{
         ress.json({status:400 ,message:'Product list not found'})    
      }
  })
 }
 // UPLOAD ALL  CATEGORY IMG
exports.uploadCategoryImg= async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
            productModel.uploadCategoryImg(req.body,(err,data)=>{
              if(err){
              ress.json({status:500 ,message:'Server error try later'})    
              }else{
                ress.json({status:201 ,message:'Product Category Img uploaded successfully'})    
              }
            })
         }else{ 
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
    }
  })
 }
 // UPLOAD PRODUCT IMAGE
exports.uploadProductImg= async(req ,ress , next )=>{
   auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
            errorHandler(req,"uploadProductImg",ress).then(resp=>{
              if(resp.status ==422){
                errorResponse("uploadProductImg",resp,ress)
              }else{
                  let productObj = {
                      productId :req.body.productId,
                      label  :req.body.label,
                      productImg  : process.env.localhost+`/product/picture/${req.file.filename}`
                  }
                   productModel.uploadProductImg(productObj ,(error , data)=>{
                  try{
                    if(error){
                         errorResponse("uploadProductImg",error,ress)
                    }else{
                      if(data.affectedRows == 1){
                         responseObject("uploadProductImg",data,ress)
                    }
                  }
                  }catch(error){
                      ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                  }
              }) 
            }
            })
         }else{
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
    }
  })
 }
  // GET CATEGORY LIST
exports.getCategoryList= async(req ,ress )=>{
  productModel.getCategoryList((error , data)=>{
    try{
      if(error){
        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
      }else{
        if(data ==""){
          ress.json({status:400 ,message:"No data found" })
        }else{
          ress.json({status:200 ,message:"Data fetched successfully", responseData:data })
        }
    }
    }catch(error){
        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
    }
}) 
}
  // GET QNTY LIST
  exports.getQntyList= async(req ,ress )=>{
    productModel.getQntyList((error , data)=>{
      try{
        if(error){
          ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{
          if(data ==""){
            ress.json({status:400 ,message:"No data found" })
          }else{
            ress.json({status:200 ,message:"Data fetched successfully", responseData:data })
          }
      }
      }catch(error){
          ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
      }
  }) 
  }
  // GET CATEGORY  DETAILS
  exports.getCtgryDetail= async(req ,ress )=>{
    productModel.getCtgryDetail(req,(error , data)=>{
      try{
        if(error){
          ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
        }else{
          if(data ==""){
            ress.json({status:400 ,message:"No data found" })
          }else{
            ress.json({status:200 ,message:"Data fetched successfully", responseData:data })
          }
      }
      }catch(error){
          ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
      }
  }) 
  }
  // UPLOAD ALL  CATEGORY IMG
exports.uploadCategoryImg= async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
            productModel.uploadCategoryImg(req.body,(err,data)=>{
              if(err){
              ress.json({status:500 ,message:'Server error try later'})    
              }else{
                ress.json({status:201 ,message:'Product Category Img uploaded successfully'})    
              }
            })
         }else{ 
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
    }
  })
 }

 // UPDATE PRODUCT DETAIL
exports.updateProductDetail= async(req ,ress , next )=>{
   auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
            errorHandler(req,"updateProductDetail",ress).then(resp=>{
              if(resp.status ==422){
                errorResponse("updateProductDetail",resp,ress)
              }else{
                productModel.updateProductDetail(req.body ,(error , data)=>{
                  try{
                    if(error){
                         errorResponse("updateProductDetail",error,ress)
                    }else{
                         responseObject("updateProductDetail",data,ress)
                  }
                  }catch(error){
                      ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                  }
              }) 
            }
            })
         }else{
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
    }
  })
 }
 
 // DELETE PRODUCT 
exports.deleteProduct= async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
   if(res !=" " && res != null){
        if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"){
           errorHandler(req,"deleteProduct",ress).then(resp=>{
             if(resp.status ==422){
               errorResponse("deleteProduct",resp,ress)
             }else{
               productModel.deleteProduct(req,(error , data)=>{
                 try{
                   if(error){
                        errorResponse("deleteProduct",error,ress)
                   }else{
                        responseObject("deleteProduct",data,ress)
                 }
                 }catch(error){
                     ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                 }
             }) 
           }
           })
        }else{
          ress.json({status:499 ,message:'Not Authorised '}) 
        }
   }
 })
}

 // GET PRODUCT  DETAIL BY PRODUCT NAME
 exports.getProductDetail= async(req ,ress , next )=>{
  productModel.getProductDetail(req,(error , data)=>{
    try{
      if(error){
           errorResponse("getProductDetail",error,ress)
      }else{
           responseObject("getProductDetail",data,ress)
    }
    }catch(error){
        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
    }
}) 
 }

 // ADD TO CART
 exports.addToCart= async(req ,ress , next )=>{
   console.log("------------no")
   console.log(req.body)
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
      if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){  
          let data ={
            addedBy:req.body.addedBy,
            userId:req.body.userId,
            productName:req.body.productName,
            productCtgry:req.body.productCtgry,
            productQnty:req.body.productQnty,
            sizeImg:req.body.sizeImg,
            ratePerKg:req.body.ratePerKg,
            productPrice:req.body.productPrice,
            productImg:req.body.productImg,
            addedon: new Date(),
            productId:req.body.productId
           }
          productModel.addToCart(data,(error , data)=>{
            try{
              if(error){
                console.log("errr")
                console.log(error)
                   errorResponse("addToCart",error,ress)
              }else{
                   responseObject("addToCart",data,ress)
            }
            }catch(error){
              console.log("================== error in addToCart  in productController================")
              console.log(error)
                ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
            }
          }) 
         }else{
          ress.json({status:499 ,message:'Not Authorised '}) 

         }
  }})
 }

 // GET  FROM  CART
 exports.getFromCart= async(req ,ress , next )=>{
  productModel.getFromCart(req,(error , data)=>{
    try{
      if(error){
            errorResponse("getFromCart",error,ress)
      }else{
            responseObject("getFromCart",data,ress)
    }
    }catch(error){
        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
    }
  })
}


  // REMOVE  FROM  CART
 exports.removeFromCart= async(req ,ress , next )=>{
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
      if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){  
  productModel.removeFromCart(req,(error , data)=>{
    try{
      if(error){
            errorResponse("removeFromCart",error,ress)
      }else{
            responseObject("removeFromCart",data,ress)
    }
    }catch(error){
        ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
    }
  }) 
}else{
  ress.json({status:499 ,message:'Not Authorised '}) 
}
}})
} 

  // REMOVE  FROM  CTGRY
  exports.removeCtgry= async(req ,ress , next )=>{
    auth (req , ress).then(res=>{
       if(res !=" " && res != null){
           if( res.accesstype == "SuperAdmin"){
              productModel.removeCtgry(req,(error , data)=>{
                try{
                  if(error){
                        errorResponse("removeCtgry",error,ress)
                  }else{
                        responseObject("removeCtgry",data,ress)
                }
                }catch(error){
                    ress.json({status:500 ,message:process.env.FIVE_ZERO_ZERO })
                }
              }) 
       }else{
        ress.json({status:401 ,message:process.env.FOUR_ZERO_ONE })
       }
    }
  })
  } 
  


exports.uploadCtgry =async(req ,ress , next ) =>{
  auth (req , ress).then(res=>{
    if(res !=" " && res != null){
         if(res.accesstype == "SuperAdmin"){
            errorHandler(req,"uploadCtrgy",ress).then(resp=>{
            if(resp.status == 422){
              errorResponse("uploadCtgry",resp,ress)
            }else{
              productModel.uploadCtgry(req ,(error , data)=>{
                    if(error){
                         console.log(error)
                         if(error.errno == 1062){
                          ress.json({status:412 ,message:'Product name already exist ',responseData:data})    
                         }
                    }else if(data.affectedRows == 1){
                       ress.json({status:200 ,message:'category uploaded ',responseData:data})    
                    }
              }) 
            }
          })
         }else{
          ress.json({status:499 ,message:'Not Authorised '}) 
         }
         
    }
  })
  
}


