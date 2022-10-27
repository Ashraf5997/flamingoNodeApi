
const joi = require('joi');

const userSchema = {
   userAddSchema    : joi.object({
       username     : joi.string().max(50).required(),
       usercontact  : joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
       password     : joi.string().min(6).max(12).required(),
       accesstype   : joi.string().allow(null).required(),
       createdby    : joi.string().allow(null).required(),
       createdon    : joi.date().raw().required(),
       isdeleted    : joi.required(),
       selctdMldId  : joi.required(),
       selctdTileId : joi.required(),
  }),

  searchUserSchema : joi.object({
      username       : joi.string().max(50).allow(null),
      usercontact    : joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").allow(null),
      userId         : joi.number().integer().allow(null),
  }),

  updateUserSchema : joi.object({
       username    : joi.string().max(50).required(),
       usercontact : joi.number().integer().min(1000000000).message("Invalid phone number").max(9999999999).message("Invalid phone number").required(),
       accesstype  : joi.string().required(),
       lastModifiedBy  : joi.string().required(),
       lastModifiedOn  : joi.date().raw().required(),
       isdeleted   : joi.required(),
       userId      : joi.number().integer(),
       selctdMldId : joi.required(),
       selctdTileId: joi.required(),
  }),

  getAllUsers :joi.object({
    limit:joi.number().integer(),
    page : joi.number().integer(),
  })
}

module.exports = userSchema;