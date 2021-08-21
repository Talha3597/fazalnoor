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
    {      console.log("Not authorized to access this route at 1")
        return next(new ErrorResponse("Not authorized to access this route",401))

    }
    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET)
       const role= req.headers.role
        const user = await User.findById(decode.id)
        if(!user)
        {
           
            return next(new ErrorResponse("No user found with this id", 404))
        }
        if(user.role!==role)
        {
            return next(new ErrorResponse("You are not authorized to accesss this page", 404))
        }
        req.user=user
        next()
    } catch (error) {
        console.log("Not authorized to access this route at 3")
        return next(new ErrorResponse("Not authorized to access this route",401))
    }
 }
}