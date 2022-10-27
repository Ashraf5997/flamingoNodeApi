
const joi = require('joi');

const addressSchema = {
   serviceAddSchema    : joi.object({
       block :  joi.string().max(100).required(),
       dist  :  joi.string().max(100).required(),
       state :  joi.string().max(100).required(),
       pincode  :  joi.number().integer().required(),
       addedby: joi.string().allow(null).max(100).required(),
       //  addedon: joi.date().allow(null).raw().required(),
       lastModifiedBy:  joi.string().allow(null).max(100).required(),
       //  lastModifiedOn: joi.date().allow(null).raw().required(),
       status: joi.required(),
       userId:  joi.number().integer().required(),
  }),

  searchServiceAddress :joi.object({
    block :  joi.string().allow(null).max(100),
    dist  :  joi.string().allow(null).max(100),
    state :  joi.string().allow(null).max(100),
    pincode :  joi.number().allow(null).integer(),
    status  :  joi.required().allow(null)
  }),


  
}
///////////// EXPORTING  /////////////
module.exports = addressSchema;