const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

module.exports = async (args, req) => {
   try{
    const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    if(payload){
        return{
            isValid:true,
            message:'Token validation successful',
            user_id:payload.user_id,
            role_id:payload.role_id
        }  
    }
   }
    catch(error){
        if (error.name === 'TokenExpiredError') {
            // Token has expired
            return{
                isValid:false,
                message:'Token has expired',
                user_id:null,
                role_id:null
            }
          } else if (error.name === 'JsonWebTokenError') {
            // Invalid token
            return{
                isValid:false,
                message:'Invalid token',
                user_id:null,
                role_id:null
            }
          } else {
            // Other errors
            return{
                isValid:false,
                message:'Token invalid',
                user_id:null,
                role_id:null
            }
          }
    }
}