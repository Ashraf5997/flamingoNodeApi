let resobj =[{}],statusCode;
let fullnameReg     = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/i);
let phonePattern    = /^\d{10}$/;
let passwordPattern = /^[A-Za-z]\w{5,14}$/;

exports.registerValidation = async(req ,res)=>{
    resobj =[{}],statusCode;
    let username    = req.body.username;
    let usercontact = req.body.usercontact;
    let password    = req.body.password;
    let accesstype  = req.body.accesstype;
    let isdeleted   = req.body.isdeleted;
    let createdby   = req.body.createdby;
    // let profileImg  = req.file; 
    if(username=="" || username ==undefined || username == null){
        statusCode=422
        resobj[0].username="fullname is required"
    }else if (!fullnameReg.test(username)){
        statusCode=422
        resobj[0].username="please provide fullname properly"
    }
    if(usercontact=="" || usercontact ==undefined || usercontact == null){
        statusCode=422
        resobj[0].usercontact="contact number is required"
    }else if(!usercontact.match(phonePattern)){
        statusCode=422
        resobj[0].usercontact="please provide valid contact number"
    }
    if(password=="" || password ==undefined || password == null){
        statusCode=422
        resobj[0].password="password is required"
    }else if(!password.match(passwordPattern)){
        statusCode=422
        resobj[0].password="password should be at least one upper case , one lower case, one numeric value , example : Abc123 between 6-14 characters"
    }
    if(accesstype=="" || accesstype ==undefined || accesstype == null){
        statusCode=422
        resobj[0].accesstype="access type is required"
    }
    if(isdeleted=="" || isdeleted ==undefined || isdeleted == null){
        statusCode=422
        resobj[0].isdeleted=" is  deleted is required"
    }
    if(createdby=="" || createdby ==undefined || createdby == null){
        statusCode=422
        resobj[0].createdby=" created by is required"
    }
   if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
    }else{
        return ({status:200 ,resData:resobj});
    }  
}

// PROFILE UPLOAD
exports.uploadProfilePic= async(req ,res)=>{
   resobj =[{}],statusCode="";
   let profileImg = req.file
   if(!profileImg){
       statusCode=422
       resobj[0].profile_img="profile image is required"
   }else{
      if(profileImg.mimetype != "image/jpeg" &&  profileImg.mimetype != "image/png" ){
            statusCode=422
            resobj[0].profile_img_type="profile image  type is  not supported please upload  .png or .jpeg file" 
        }
        if(profileImg.size >= "30000"){
            statusCode=422
            resobj[0].profile_img_size="profile image size should less than  10 mb" 
        }
        if(req.body.uploadedby =="" || req.body.uploadedby == null || req.body.uploadedby == undefined){
            statusCode=422
            resobj[0].uploadedby="Please provide uploaded by"    
        }
        if(req.body.userId =="" || req.body.userId == null || req.body.userId == undefined){
            statusCode=422
            resobj[0].userId="Please provide user Id"    
        }
   }
   if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
   }else{
        return ({status:200 ,resData:profileImg});
   }
}
// LOGIN
exports.login = async(req,res)=>{
    resobj =[{}],statusCode="";
    if(req.body.usercontact == null || req.body.usercontact =="" || req.body.usercontact == undefined){
        statusCode=422
        resobj[0].usercontact="Please provide contact number"    
    }
    if(req.body.password == null || req.body.password =="" || req.body.password == undefined){
        statusCode=422
        resobj[0].passowrd="Please provide password"  
    }
    if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
   }else{
        return ({status:200 ,resData:req});
   }
}
// FORGOT PASSWORD
exports.forgotPassword= async(req,res)=>{
    resobj =[{}],statusCode="";
    if(req.body.usercontact == null || req.body.usercontact =="" || req.body.usercontact == undefined){
        statusCode=422
        resobj[0].usercontact="Please provide contact number"    
    }
    if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
    }else{
            return ({status:200 ,resData:req});
    }
}

// PROFILE UPLOAD
exports.uploadProductPic= async(req ,res)=>{
    resobj =[{}],statusCode="";
        if(req.body.addedby =="" || req.body.addedby == null || req.body.addedby == undefined){
             statusCode=422
             resobj[0].userName="Please provide uploadedby"    
         }
         if(req.body.userId =="" || req.body.userId == null || req.body.userId == undefined){
             statusCode=422
             resobj[0].userId="Please provide userId"    
         }
         if(req.body.productQnty =="" || req.body.productQnty == null || req.body.productQnty == undefined){
            statusCode=422
            resobj[0].productQnty="Please provide product quantity"    
         }
         if(req.body.productCtgry =="" || req.body.productCtgry == null || req.body.productCtgry == undefined){
            statusCode=422
            resobj[0].productCtgry="Please provide product category"    
         }
         if(req.body.productName =="" || req.body.productName == null || req.body.productName == undefined){
            statusCode=422
            resobj[0].productName="Please provide product name"    
         }
         if(req.body.remainingQnty =="" || req.body.remainingQnty == null || req.body.remainingQnty == undefined){
            statusCode=422
            resobj[0].remainingQnty="Please provide product remaining quantity"    
         }
         if(req.body.isOutOfStock =="" || req.body.isOutOfStock == null || req.body.isOutOfStock == undefined){
            statusCode=422
            resobj[0].isOutOfStock ="Please provide product isOutOfStock"    
         }
    if(statusCode == 422){
         return ({status:statusCode ,resData:resobj});
    }else{
         return ({status:200 ,resData:req});
    }
 }

 exports.uploadProductImg=async(req,res)=>{
    let productImg = req.file;
    if(!productImg){
        statusCode=422
        resobj[0].product_img="product image is required"
    }else{
        if(productImg.mimetype != "image/jpeg" &&  productImg.mimetype != "image/png" ){
             statusCode=422
             resobj[0].product_img_type="product image  type is  not supported please upload  .png or .jpeg file" 
         }
         if(req.body.productId == "" || req.body.productId==undefined || req.body.productId== null ){
            statusCode=422
            resobj[0].productId="product ID is required" 
         }
         if(productImg.size >= "6000000"){
            statusCode=422
            resobj[0].product_img_size="product image size should be less than  10 mb" 
         }
    }
    if(statusCode == 422){
            return ({status:statusCode ,resData:resobj});
    }else{
            return ({status:200 ,resData:req});
    }
 }
 
 exports.updateProductDetail=async(req,res)=>{
    statusCode=null;
    let productDetail = req.body;
    if(!productDetail){
        statusCode=422
        resobj[0].body="body is required"
    }else{
         if(productDetail.pId == "" || productDetail.pId==undefined || productDetail.pId== null ){
            statusCode=422
            resobj[0].productId="product ID is required" 
         }
         if(productDetail.pName == "" || productDetail.pName==undefined || productDetail.pName== null ){
            statusCode=422
            resobj[0].productName="product name is required" 
         }
         if(productDetail.pCtgry == "" || productDetail.pCtgry==undefined || productDetail.pCtgry== null ){
            statusCode=422
            resobj[0].productCtgry="product category is required" 
         }
         if(productDetail.pQnty == "" || productDetail.pQnty==undefined || productDetail.pQnty== null ){
            statusCode=422
            resobj[0].productQnty="product quantity is required" 
         }
         if(productDetail.pRemQnty== "" || productDetail.pRemQnty==undefined || productDetail.pRemQnty== null ){
            statusCode=422
            resobj[0].productRemQnty="product remaining quantity is required" 
         }
         if(productDetail.pOOS== "" || productDetail.pOOS==undefined || productDetail.pOOS== null ){
            statusCode=422
            resobj[0].productPoos="product out of stock is required" 
         }
         if(productDetail.pRate== "" || productDetail.pRate==undefined || productDetail.pRate== null ){
            statusCode=422
            resobj[0].productRate="product rate is required" 
         }
    }
    if(statusCode == 422){
            return ({status:statusCode ,resData:resobj});
    }else{
            return ({status:200 ,resData:req});
    }
 }
 exports.deleteProduct=async(req,res)=>{
    if(req.params.productId.pId == "" || req.params.productId==undefined ||req.params.productId== null ){
        statusCode=422
        resobj[0].productId="product ID is required" 
     }
    if(statusCode == 422){
            return ({status:statusCode ,resData:resobj});
    }else{
            return ({status:200 ,resData:req});
    }
 }
 exports.placeOrder = async(req,res)=>{
    let orderDetail = req.body;
    if(!orderDetail){
        statusCode=422
        resobj[0].body="body is required"
    }else{
        if(orderDetail.userId == ""||orderDetail.orderBy == ""||orderDetail.orderOn == ""||orderDetail.orderId == ""){
            statusCode=422
            resobj[0].body="order data is required"
        }
    }
    if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
    }else{
        return ({status:200 ,resData:req});
    }
 }
 exports.uploadCtrgy = async(req,res)=>{
    let orderDetail = req.body;
    if(!orderDetail){
        statusCode=422
        resobj[0].body="body is required"
    }else{
        if(orderDetail.ctgryName == ""||orderDetail.octgryImg == ""){
            statusCode=422
            resobj[0].body="please  provide all data"
        }
    }
    if(statusCode == 422){
        return ({status:statusCode ,resData:resobj});
    }else{
        return ({status:200 ,resData:req});
    }
 }

 



