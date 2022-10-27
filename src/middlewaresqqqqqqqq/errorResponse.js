const chalk   =    require('chalk');
const log     =    console.log;
module.exports = errorResponse = (action, resp,ress) =>{

    if(process.env.CONSOLE_LOG == "TRUE"){
      log(chalk.red("================== ERROR RESPONSE ================="))
      console.log(action +"    "+ JSON.stringify(resp))
    }
    
   let status = resp.status,responseData=resp.resData;
    switch(action){
        case "register":{
            if(resp.errno == 1062){
              status = 409,
              responseData="contact number"+" "+process.env.FOUR_ZERO_NINE 
            }
            ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" "+"registration",responseData:responseData })
            break;
        }
        case "login":{
            ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" "+"login",responseData:responseData })
            break;
        }
        case "uploadProfilePic":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" profile picture upload",responseData:responseData })
          break;
        }
        case "forgotPassword":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" forgot password",responseData:responseData })
          break;
        }
        case "uploadProduct":{
          if(resp.errno == 1062){
            status = 409,
            responseData=" product name "+" "+process.env.FOUR_ZERO_NINE 
          }
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" product  upload",responseData:responseData })
          break;
        }
        case "uploadProductImg":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" Product Images upload",responseData:responseData })
          break;
        }
        case "deleteProduct":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" Product delete",responseData:responseData })
          break;
        }
        case "getProductDetail":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" Product Detail",responseData:responseData })
          break;
        }
        case "updateProductDetail":{
          if(resp.errno == 1062){
            status = 409,
            responseData="Product name"+" "+process.env.FOUR_ZERO_NINE 
          }
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" Product detail update",responseData:responseData })
          break;
        }
        case "addToCart":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" Product detail update",responseData:responseData })
          break;
        }
        case "getFromCart":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" cart data",responseData:responseData })
          break;
        }
        case "removeFromCart":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" cart data",responseData:responseData })
          break;
        }
        case "placeOrder":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" place order",responseData:responseData })
          break;
        }
        case "getOrder":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" get order",responseData:responseData })
          break;
        }
        case "uploadCtrgy":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" upload category",responseData:responseData })
          break;
        }
        case "removeCtgry":{
          ress.json({status :status ,message:process.env.COMMOM_ERR_MSG+" remove category",responseData:responseData })
          break;
        }

       
    }
}
