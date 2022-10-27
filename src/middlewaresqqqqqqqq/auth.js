

const JwtService  =   require('../services/JwtService');

module.exports= authenticator = async(req , res , next )=>{
     let authHeader = req.headers.authorisation;
     let token;
     if(!authHeader){
        res.json({status:499, message:"Not Authorized"})
     }else{
          token = authHeader.split(' ')[1]; 
          try{
                const {id , accesstype,fullname } = await JwtService.verify(token)
                const user = {
                    id,
                    accesstype,
                    fullname
                }
                return user;
            }catch(err){
                res.json({status:403, message:process.env.FOUR_ZERO_THREE})
            }
    }

}

