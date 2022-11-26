var dbConn = require('../../../../config/db.config');

var orderModal = {
    placeOrder: {},
    getOrder:{},
    getOrderedProducts:{},
    deleteOrder:{}
}
orderModal.deleteOrder = (req, result )=>{
   dbConn.query(`DELETE FROM orders WHERE id=${req.body.id} AND orderStatus = 'Order Receivedss'` ,(err,res)=>{ 
        if(err)
        {  
            result( err, null)
        }else{
                let productIds = req.body.productIds.split(",")
                var products = array=[],i=0;
                productIds.forEach(id => {
                    dbConn.query(`DELETE FROM cart WHERE id=${id} ` ,(err,res)=>{ 
                        if(err){ result( err, null)
                        }else{ 
                            i = i+1
                            if(i==productIds.length){
                                result(null , products)
                            }
                        }
                    })
                });
        }
   })
}
orderModal.getOrderedProducts = (req, result )=>{
    let productIds = req.body.productIds.split(",")
    var products = array=[],i=0;
    productIds.forEach(id => {
        dbConn.query(`SELECT * FROM cart WHERE id = ${parseInt(id)}  AND userId = ${parseInt(req.body.userId)}` , (err , res)=>{
        if(err){ result( err, null)}else{ 
             if(res[0]!= null){
                  products.push(res[0])
                }
                i = i+1
                if(i==productIds.length){
                    result(null , products)
                }
            }
        })
    });
}
orderModal.getOrder = async(req, result )=>{
   dbConn.query(`SELECT * FROM orders WHERE orders.userId=${req.params.userId} `,(err,ress)=>{
    if(err){
        if(err){ result( err, null)}
    }else if(ress.length > 0){
        let limit = req.body.limit;
        let page  = req.body.page;
        let totalLength = ress.length;
        let totalPage   =  Math.trunc( totalLength/limit );
        let startingLimit = (page - 1) * limit;
        dbConn.query(`SELECT * FROM orders JOIN deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId  WHERE orders.userId=${req.params.userId} ORDER BY orders.id DESC  LIMIT  ${startingLimit} , ${limit} ` , (err , res)=>{
            if(err){ result( err, null)
            }else{  
                let resObj ={ totalLength : totalLength, totalPage : totalPage ,data:res}
                result( null, resObj)
            }
        })
    }else{
        result( null, {"message":"No records exist with this userId "+req.params.userId})
    }
  })
    
}
orderModal.placeOrder = (req, result )=>{
    req.body.orderOn        = new Date()
    req.body.RetrnReqBy     = null
    req.body.RetrnReqOn     = null
    req.body.RetrnReqResn = null
    dbConn.query('INSERT INTO orders SET?' , req.body , (err , res)=>{
        if(err){ result( err, null)
        }else{  
            dbConn.query("UPDATE cart SET orderPlaced ='YES' WHERE userId ",[parseInt(req.body.userId)] ,(err,res)=>{ 
                if(err){ result( err, null)
                }else{  result(null ,res)  }
            })
        }
    })
} 

//*******************    EXPORTING   ***************** */
module.exports =  orderModal;