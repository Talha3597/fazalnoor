const jwt = require('jsonwebtoken')
const User =require('../model/user')
require('dotenv').config({path: '../.env'})
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async(req,res,next)=>
{
        
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        
       const  token = req.headers.authorization.split(" ")[1]
       
     if(!token)
    {   
        next( new ErrorResponse("Not authorized to access this route",404))

    }
    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET)
       const role= req.headers.role
        const user = await User.findById(decode.id)
        if(!user)
        {
           
             next( new ErrorResponse("No user found with this id"),401)
        }
        if(user.role!==role)
        {
            next( new ErrorResponse("You are not authorized to accesss this page",401))
        }
        req.user=user
        next()
    } catch (error) {
       
        next( new ErrorResponse("Not authorized to access this route",404))
    }
 }
 else{
    
    next( new ErrorResponse("You are not authorized to accesss this page",500))
 }
}
