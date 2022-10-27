
const chalk   =    require('chalk');
const log     =    console.log;
module.exports = responseObject = (action,resp,ress) =>{
    if(process.env.CONSOLE_LOG == "TRUE"){
        log(chalk.green("================== RESPONSE OBJECT ================="))
     }
    let status = resp.status,responseData=resp.resData;
    switch(action){
        case "register":{
            if(resp.affectedRows == 1){
                status = 201,
                responseData=resp.insertId
            }
            ress.json({status :status ,message:"Registration successfull please sign-in now ",responseData:responseData })
            break;
        }
        case "uploadProfilePic":{
            ress.json({status :status ,message:" Profile picture uploaded successfully ",responseData:resp})
            break;
        }
        case "uploadProductImg":{
            if(resp.affectedRows == 1){
                status = 201,
                responseData=resp.insertId
            }
            ress.json({status :status ,message:" Product picture uploaded successfully ",responseData: responseData})
            break;
        }
        case "uploadProduct":{
            if(resp.affectedRows == 1){
                status = 201,
                responseData=resp.insertId
            }
            ress.json({status :status ,message:" Product  uploaded successfully ",responseData:resp})
            break;
        }
        case "login":
            ress.json({status :status ,message:" You have successfully logged-in ",responseData:resp})
            break;
        case "updateProductDetail":
            if(resp.affectedRows == 1){
                status = 201,
                responseData=resp.insertId
            }
             ress.json({status :status ,message:" Product detail successfuly updated ",responseData:resp})
             break;
        case "deleteProduct":
             if(resp.affectedRows == 1){
                    status = 200,
                    responseData=resp.insertId
             }
             ress.json({status :status ,message:" Product deleted successfuly ",responseData:resp})
             break;
        case "getProductDetail":
                status = 200,
                ress.json({status :status ,message:" Product detail fetched successfuly ",responseData:resp})
            break;
        case "addToCart":
                if(resp.affectedRows == 1){
                    status = 200,
                    responseData=resp.insertId
             }
             ress.json({status :status ,message:"  Added in the cart ",responseData: responseData})
            break;
        case "getFromCart":
             ress.json({status :200 ,message:"  fetched from the cart successfully ",responseData:resp})
             break;
        case "removeFromCart":
                if(resp.affectedRows == 1){
                    status = 200,
                    responseData=resp.insertId
             }
             ress.json({status :status ,message:"  deleted from  the cart ",responseData: responseData})
            break;
        case "placeOrder":
             if(resp.affectedRows == 1){
                    status = 200,
                    responseData=resp.insertId
             }
             ress.json({status :200 ,message:" order placed successfully ",responseData: responseData})
            break;
        case "placeOrder":
                ress.json({status :200 ,message:" order details successfully ",responseData: responseData})
            break;
        case "uploadCtrgy":
            console.log("iiiiiiiiiiiiiii")
            console.log(resp)
            console.log(responseData)
            if(resp.affectedRows == 1){
                    status = 200,
                    responseData=resp.insertId
            }
            ress.json({status :200 ,message:" category uploaded successfully ",responseData: responseData})
            break;
        case "removeCtgry":
            if(resp.affectedRows == 1){
                     status = 200,
                     responseData=resp.insertId
            }
            ress.json({status :200 ,message:" order removed successfully ",responseData: responseData})
            break;

    }
}

