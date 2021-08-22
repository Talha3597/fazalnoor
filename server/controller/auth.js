const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const User =require('../model/user')
const Salary =require('../model/salarySchema')
const bcrypt =require('bcryptjs')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail =require('../utils/sendEmail')
require('dotenv').config({path: '../.env'})
exports.register=async (req,res,next)=>
{
   
    const {employeeNo,username,email,password,cnic,address,phoneNo,salary,invoiceNo,paidAmount,description,role,Class,section}=req.body
    const user1=await  User.findOne({email})
    const user2=await  User.findOne({employeeNo})
    let joiningDate=new Date()
    if(user1)
    {    
        return res.status(200).json({success:true,data:'This email is Already Registered'})
    }
    if(user2)
    {    
        return res.status(200).json({success:true,data:'This EmployeeNo is Already Registered'})
    }
    if(password.length<4)
    {
        return res.status(200).json({success:true,data:'Password is too short'})
    }
    try {
       
        if(Class=='' && section==''){
        const user =  User.create({
           employeeNo ,username,email,password,cnic,address,phoneNo,salary,description,role,joiningDate
        })
       .then(res.status(200).json({success:true,data:"Successfully registerd" }))
        }
        else if(Class!='' && section!='') {
            const user =  User.create({
                employeeNo ,username,email,password,cnic,address,phoneNo,salary,description,role,Class,section,joiningDate
             })
             .then(res.status(200).json({success:true,data:"Successfully registerd" }))
             
        }
        res.status(200).json({success:true,data:"Select section" })        
       
    } catch (error) {
        
        res.status(200).json({success:false, data:"Not Registered"})
    }
}
exports.login=async(req,res,next) =>{
    const {email, password}=req.body
    if(!email && !password)
    {
        return next(new ErrorResponse("Please enter email and password",400))
    }
    try {
        const user=await  User.findOne({email}).select("+password")
        if(!user)
        {
            return next(new ErrorResponse("Invalid email or password",401))
        }
          const ismatch =await user.matchPassword(password)
        if(!ismatch)
        {
            return next(new ErrorResponse("Invalid email or password",401))
        }
        sendToken(user,200,res)
        
    } catch (error) {
        res.status(500).json({success:false, error:error.message})
    }
}
exports.forgotpassword=async(req,res,next) =>{
    const {email} = req.body
    const user= await User.findOne({email})
    if(!user)
    {
        res.status(400).json({success:true, data:"Provide Registerd Email"})

    }
    try {
       
        const resetToken= await user.getResetPasswordToken()
        
        await user.save();
        const resetUrl = `https://fazal-school.herokuapp.com/passwordreset/${resetToken}`
        const message = `
        <h1> You have requested a password reset <h1/>
        <p>Please go to this link to reset your password<p/>
        <a href=${resetUrl} clickTracking=off>${resetUrl}<a/>
        `
        
        try {
           await sendEmail({
               to:user.email,
               subject:"Password reset request",
               text:message
           }) 
           
           res.status(200).json({success:true, data:"Email Sent"})
        } catch (error) {
            resetPasswordToken=undefined
            resetPasswordExpire=undefined
            await user.save()
            return next(new ErrorResponse("Email could not be sent"),500)
        }
    } catch (error) {
        res.status(500).json({success:false, data:"Email Not Sent"})
    }
}
exports.resetpassword=async(req,res,next) =>{
    const resetPasswordToken= crypto.createHash(sha256).update(req.params.resetToken).digest
    ('hex')
    try {
        const user = await User.find({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })
        if(!user)
        {
            return next(new ErrorResponse("Invlid reset token",400))

        }
        user.password=req.body.password
        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined

        await user.save()
        res.status(201).json({success:true,data:"Password reset successs"})
    } catch (error) {
        next(error)
    }
}

const sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken()
    const role=user.role;
    const username=user.username
    const Class=user.Class;
    const section=user.section
    const id=user._id
    res.status(statusCode).json({success:true, token,username,role,Class,section,id})
}

module.exports.getUser= async(req,res)=>
{        
       const {id}=req.query
       
      await User.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.findUser = async(req,res)=>
{        if(req.query.id!=''){
       const {id}=req.query
       
      await User.find({employeeNo:id}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    });
}
}

module.exports.users = async(req,res)=>
{        
       const search=req.query.search
       const employeeNo=req.query.employeeNo
       const role=req.query.role
       
       if(employeeNo!=''){
       await User.find({employeeNo:employeeNo}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })}
        else if(search==''){
            await User.find({}).sort({_id:-1}).limit(200)
            .then((data)=>{
                
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })  
        }
        else{
            await User.find({username: { $regex: search,'$options' : 'i' }}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
        }
      
       
}
module.exports.usersData = async(req,res)=>
{        
       const search=req.query.search
       
       
       await User.find({})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
      
       
}

module.exports.deleteUser=(req,res)=>{
    
    const employeeNo=req.query.id
  console.log(employeeNo)
    
    User.deleteOne({employeeNo:employeeNo}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            res.status(200)
           
        }
    });
}

module.exports.updateProfile=async(req,res)=>
{
    const user = await User.findById(req.params.id)

  if (user && req.body.password) {
    user.address = req.body.address || user.address
    user.phoneNo = req.body.phoneNo || user.phoneNo
    user.address = req.body.address || user.address
    user.password = req.body.password || user.password
    user.description = req.body.description || user.description
    
     await user.save()
    res.send(200)
  }
  else if(user){
    user.address = req.body.address || user.address
    user.phoneNo = req.body.phoneNo || user.phoneNo
    user.address = req.body.address || user.address
   
    user.description = req.body.description || user.description
    
     await user.save()
    res.send(200)
  }
  else{
      res.send(401)
  }
  
}
module.exports.updateUser=(req,res)=>
{
    
    User.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify student info..."});
        } else {           
           
           
           res.status(200).send(data);
        }
    }); 
}