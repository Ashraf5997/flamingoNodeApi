
const joi = require('joi');

const productSchema = {
    addEditProdCtgry  : joi.object({
       pctgryName     : joi.string().max(100).required(),
       pctgryImg      : joi.string().max(250).required(),
       uploadedBy     : joi.string().allow(null).required(),
       uploadedDate   : joi.date().raw().allow(null).required(),
       lastModifyBy   : joi.string().allow(null).required(),
       lastModifyDate : joi.date().raw().allow(null).required(),
   }),
}

///////////// EXPORTING  /////////////
module.exports = productSchema;