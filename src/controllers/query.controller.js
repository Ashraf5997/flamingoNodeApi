const queryModel  = require('../models/query.model');
require("dotenv").config( );
const auth    =     require('../middlewares/auth');
require("dotenv").config( );
exports.createQuery = async(req ,ress , next )=>{
     auth (req , ress).then(res=>{
          if(res !=" " && res != null){
               if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){  
                    const userObj ={
                         fullname :req.body.fullname,
                         contact  :req.body.contact,
                         query    :req.body.query,
                         queryDate: new Date(),
                     }
                     queryModel.CreateQuery(userObj , (err , data)=>{
                          if(err){
                                 ress.json({status:409 ,message:'Internet issue try after sometime' })
                              }else{
                                 ress.json({status:201 ,message:' Thanks for your query , we will respond  with in 2 hours ' ,newUserId:data.insertId })    
                          }  
                      }) 
               }else{     
                         ress.json({status:499 ,message:'Not Authorised '}) 
               }
          }   
     })
  
 }
 // GET  QUERIES 
exports.getQuery = async(req ,ress , next )=>{
     queryModel.getQuery( (err , data)=>{
         if(err){
              ress.json({status:409 ,message:'Internet issue try after sometime' })
          }else{
              ress.json({status:201 ,message:' Query list fetched successfully' ,queryData:data })    
         }  
     })
}
// DELETE  QUERIES 
exports.deleteQuery = async(req ,ress , next )=>{
     auth (req , ress).then(res=>{
          if(res !=" " && res != null){
               if(res.accesstype == "Admin" || res.accesstype == "SuperAdmin"||res.accesstype == "Customer"||res.accesstype == "Delivery"||res.accesstype == "WaterSupplier"){ 
                    let id= req.params.id;
                    queryModel.deleteQuery( id,(err , data)=>{
                        if(err){
                            ress.json({status:409 ,message:'Internet issue try after sometime' })
                            }else{
                                 ress.json({status:201 ,message:' Query deleted  successfully' })    
                        }  
                    }) 
               }
          }
     })
    
}