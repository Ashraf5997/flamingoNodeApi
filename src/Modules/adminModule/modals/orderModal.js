var dbConn = require('../../../../config/db.config');

var orderModal = {
    getAllOrder:{},
    filterOrder:{},
}

orderModal.filterOrder= (req, result )=>{
    let usercontact = req.body.contactnumber;
    if(usercontact != null && usercontact != "" && usercontact != undefined && usercontact != "null"){
        dbConn.query('SELECT * FROM users Where usercontact=? ',[ usercontact] , (err , res)=>{
            if(err) {
               result( err, null)
            }else{
                dbConn.query(`SELECT * FROM orders JOIN users ON orders.userId = users.userId JOIN  deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId JOIN  allcateddlvrypartnr ON allcateddlvrypartnr.orderId = orders.id JOIN  dlvryptnrlocatn ON  dlvryptnrlocatn.id = allcateddlvrypartnr.delvryPtnerId WHERE orders.userId=? `,[res[0].userId], (err , res)=>{
                    if(err) { result( err, null)
                    }else{ result( null, res) }
                })
            }})
    }else{
        let orderId = req.body.orderId;
        let orderStatus = req.body.orderStatus;
        let orderOn = req.body.orderOn
        dbConn.query("SELECT * FROM orders JOIN users ON orders.userId = users.userId JOIN  deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId JOIN  allcateddlvrypartnr ON allcateddlvrypartnr.orderId = orders.id JOIN  dlvryptnrlocatn ON  dlvryptnrlocatn.id = allcateddlvrypartnr.delvryPtnerId WHERE orders.id LIKE '%"+orderId+"' OR  orders.orderStatus LIKE '%"+ orderStatus+"' OR  orders.today LIKE '%"+orderOn+"'  "  , (err , res)=>{
            if(err) { result( err, null)
            }else{ result( null, res) }
        })
    }
   
}


orderModal.getAllOrder = (req, result )=>{
    dbConn.query('SELECT * FROM orders ' , (err , res)=>{
        if(err)
        {
            result( err, null)
        }else{

          let limit = req.params.limit;
          let page  = req.params.page;  
          let totalLength   =  res.length;
          let totalPage     =  Math.trunc( totalLength/limit );
          let startingLimit = (page - 1) * limit;
         
          dbConn.query(`SELECT * FROM orders JOIN users ON orders.userId = users.userId 
            JOIN  deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId
            JOIN  allcateddlvrypartnr ON allcateddlvrypartnr.orderId = orders.id 
            JOIN  dlvryptnrlocatn ON  dlvryptnrlocatn.id = allcateddlvrypartnr.delvryPtnerId
           ORDER BY orders.id  DESC LIMIT  ${startingLimit} , ${limit} `  , (err , res)=>{
          //dbConn.query(`SELECT * FROM orders  JOIN  deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId JOIN users ON orders.userId = users.userId ORDER BY orders.id  DESC LIMIT  ${startingLimit} , ${limit} `  , (err , res)=>{
                if(err){
                    result( err, null)
                }else{
                    let resObj ={ totalLength : totalLength, totalPage : totalPage ,data:res}
                    result( null, resObj)
                } 
               })
           }
    })
} 


//*******************    EXPORTING   ***************** */
module.exports =  orderModal;
