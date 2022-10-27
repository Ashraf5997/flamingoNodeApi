
const { connect } = require('../../../../config/db.config');
var dbConn = require('../../../../config/db.config');

var cartModal = {
    addCart: {},
   // getAllCart: {},
    getCartByUserId: {},
    removeCartByUserIdPid:{},
    deleteCartByUserIdPid:{}
}
cartModal.deleteCartByUserIdPid = (req, result )=>{
    dbConn.query("DELETE  FROM  cart WHERE userId =? AND id=?",[parseInt(req.params.userId), parseInt(req.params.pId)] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
} 
cartModal.removeCartByUserIdPid = (req, result )=>{
    dbConn.query("SELECT *  FROM  cart WHERE userId =?",[req.body.userId] ,(err,res)=>{ 
        if(err){ result( err, null)
        } else if(res !="" || res.length != 0)   {
            var block =  false;
            var i = 0;
            for( i = 0 ; i< res.length ; i++){
                if(parseInt(res[i].productId) == parseInt(req.body.data.productId )){
                        block = true;
                        let productPrice = parseInt(res[i].productPrice)-parseInt(req.body.data.ratePerKg)
                        let productQnty = parseInt(res[i].productQnty)-1
            
                        if(productQnty == 0){
                            dbConn.query("DELETE  FROM  cart WHERE userId =? AND id=?",[parseInt(req.body.userId), parseInt(res[i].id)] ,(err,res)=>{ 
                                if(err){ result( err, null)
                                }else{  result(null ,{status:200,message:`${req.body.data.productName} is deleted from your cart successfully`})  }
                            })
                        }else{
                            dbConn.query('UPDATE cart SET productPrice=?, productQnty = ? WHERE  id=? ',[parseInt(productPrice),parseInt(productQnty),parseInt(res[i].id)] , (error, ress)=>{
                                if(error){ 
                                    result( error, null)
                                }else{  
                                    result(null ,{status:200,message:`1kg ${req.body.data.productName} is removed from your cart successfully`})
                                }
                            })
                        }
                    }
                    if(i == res.length-1 && !block){
                        result(null ,{status:400,message:`You have't added ${req.body.data.productName} yet `})
                    }
            };
        }else{
            result(null ,{status:400,message:"Sorry your cart is empty"})
        }
    })
}

cartModal.getCartByUserId = (req, result )=>{
    dbConn.query("SELECT *  FROM  cart WHERE userId =? AND orderPlaced ='No'",[parseInt(req.params.userId)] ,(err,res)=>{ 
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
} 

cartModal.addCart = (body, result )=>{
    body.addedon = new Date()
    body.orderPlaced = "No"
    dbConn.query("SELECT * FROM  cart WHERE userId =? AND productId=? AND orderPlaced = 'No'",[parseInt(body.userId),body.productId] ,(err,ress)=>{ 
        if(err){ result( err, null)
        }else{ 
           if(ress !="" || ress.length != 0){   
            let productPrice = ress[0].productPrice+body.productPrice
            let productQnty = parseInt(ress[0].productQnty)+parseInt(body.productQnty)
            dbConn.query('UPDATE cart SET productPrice=?, productQnty = ? WHERE userId=? AND productId=?',[productPrice,productQnty,parseInt(body.userId),parseInt(body.productId)] , (err, res)=>{
                if(err){ 
                       result( err, null)
                }else{ 
                     result(null ,res)
                 }
            })
           }else{
                // adding into cart
                dbConn.query('INSERT INTO cart SET?' , body , (err , res)=>{
                    if(err){ result( err, null)
                    }else{  result(null ,res)  }
                })
           }
        }
    })
}

//*******************    EXPORTING   ***************** */
module.exports =  cartModal; 