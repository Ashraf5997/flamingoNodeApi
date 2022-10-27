var dbConn = require('../../../../config/db.config');

var orderModal = {
    getAllOrder:{}
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
         
            dbConn.query(`SELECT * FROM orders  JOIN  deliveryAddress ON orders.addressId = deliveryAddress.delvryAddId  LIMIT  ${startingLimit} , ${limit}` , (err , res)=>{
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
