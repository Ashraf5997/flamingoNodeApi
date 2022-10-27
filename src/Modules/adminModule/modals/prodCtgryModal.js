var dbConn = require('../../../../config/db.config');

var prodCtgryModal = {
    addProdCtgry: {},
    updateProdCtgry: {},
    deleteProdCtgry: {},
    getAllProdCtgry:{},
    getProdCtgryById:{}
}

prodCtgryModal.addProdCtgry = (body, result )=>{
    dbConn.query('INSERT INTO productctgrylist SET?' , body , (err , res)=>{
        if(err){ result( err, null)
        }else{  result(null ,res)  }
    })
}

prodCtgryModal.updateProdCtgry = (req,id, result )=>{
    dbConn.query("UPDATE productctgrylist SET pctgryName=? ,lastModifyBy=?, lastModifyDate=? WHERE pcId =?",[req.pctgryName,req.lastModifyBy,req.lastModifyDate,id],(err , res)=>{
        if(err)
        {
             result( err, null)
        }else{
             result(null ,res) 
        }
   })
}

prodCtgryModal.getProdCtgryById = (req , result)=>{
    dbConn.query("SELECT * FROM productctgrylist WHERE pcId= "+[req.params.id],(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

prodCtgryModal.getAllProdCtgry = (req , result )=>{
    dbConn.query("SELECT * FROM productctgrylist",(err , res)=>{
        if(err) { result( err, null)
        }else{ result(null ,res) }
    })
}

prodCtgryModal.deleteProdCtgry = (req, result )=>{
    dbConn.query("DELETE FROM productctgrylist WHERE pcId=?",[req.params.id],(err,res)=>{ 
        if(err) { result( err, null)
        }else{ result(null ,res)  }
    })
}

//*******************    EXPORTING   ***************** */
module.exports = prodCtgryModal;

