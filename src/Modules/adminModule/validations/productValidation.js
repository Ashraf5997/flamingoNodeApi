const ApiError = require('../../../middleWares/errors/ApiError')
//const commonResObj = require('../../../middleWares/responses/commonResponse')
const productSchema = require('../schemas/productSchema');

require("dotenv").config( );
const productValidation ={
    // products ctgry
    addProdCtgry:{},
    updateProdCtgry:{},
    deleteProdCtgry :{},
    // products
    addProduct:{},
    updateProduct:{},
    deleteProduct:{},
    searchProduct :{}

}
// PRODUCT CTGRY
productValidation.addProdCtgry =  async(req,res,next) =>{
    if(ApiError.checkUserRole(req,res,["WRITE_CATEGORY_MANAGEMENT"])){ if(ApiError.checkBody(req,res)){  ApiError.checkError(await productSchema.addEditProdCtgry.validate(req.body) ,req,res,next) } }
}
productValidation.deleteProdCtgry =  async(req,res,next) =>{ 
    if(ApiError.checkUserRole(req,res,["WRITE_CATEGORY_MANAGEMENT"])){ next()}
}
productValidation.updateProdCtgry =  async(req,res,next) =>{ 
   if(ApiError.checkUserRole(req,res,["WRITE_CATEGORY_MANAGEMENT"])){ next()}
}
// PRODUCT
productValidation.deleteProduct =  async(req,res,next) =>{ 
   if(ApiError.checkUserRole(req,res,["WRITE_PRODUCT"])){ next()}
}
productValidation.addProduct =  async(req,res,next) =>{ 
   if(ApiError.checkUserRole(req,res,["WRITE_PRODUCT"])){ next()}
}
productValidation.updateProduct =  async(req,res,next) =>{ 
   if(ApiError.checkUserRole(req,res,["WRITE_PRODUCT"])){ next()}
}
productValidation.searchProduct =  async(req,res,next) =>{ 
   if(ApiError.checkUserRole(req,res,["WRITE_PRODUCT"])){ next()}
}

//////////////////   EXPORTING //////////////////////
module.exports = productValidation;