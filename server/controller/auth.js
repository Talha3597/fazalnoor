const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const User =require('../model/user')
const Salary =require('../model/salarySchema')
const bcrypt =require('bcryptjs')
const ErrorResponse = require('../utils/errorResponse')
const sectionSchema = require('../model/SD_model/sectionSchema')
const sendEmail =require('../utils/sendEmail');
const { Console } = require("console");
require('dotenv').config({path: '../.env'})
exports.register=async (req,res,next)=>
{
   
    const {username,email,password,cnic,address,phoneNo,salary,invoiceNo,paidAmount,description,role,Class,section}=req.body
    const user1=await  User.findOne({email:email})
   
    let joiningDate=new Date()
  
    if(user1)
        {    
         res.status(200).json({success:true,data:'This email is Already Registered'})
        }
        else{
            try {
       
       
                if(Class=='' && section==''){
                const user =  User.create({
                   username,email,password,cnic,address,phoneNo,salary,description,role,joiningDate
                })
               .then(res.status(200).json({success:true,data:"Successfully registerd" }))
                }
                else{
                    const user =  User.create({
                        username,email,password,cnic,address,phoneNo,salary,description,role,Class,section,joiningDate
                     })
      
                    
                     sectionSchema.updateOne({title:section}, {$set:{teacher:username}})
                     .then(   res.status(200).json({success:true,data:"Successfully registerd" }))
                     
                }
                       
               
            } catch (error) {
                
                res.status(200).json({success:false, data:"Not Registered"})
            }
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
        const resetUrl = `https://fazalnoor.com/passwordreset/${resetToken}`
        const message = `
        <h1> We heard that you lost your fazalnoor account password. Sorry about that!

        But don’t worry! <h1/>
        <p>Please go to this link to reset your password<p/>
        <a href=${resetUrl} clickTracking=off>${resetUrl}<a/>
        <h3>If you don’t use this link within 24 hours, it will expire. To get a new password reset link, visit: https://fazalnoor.com/forgotpassword

        </h3><h3>Thanks,</h3>
       <h3> The FazalNoor Team</h3>
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
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.resetToken).digest
    ("hex")
    try {
        let user = await User.find({
            resetPasswordToken,
            //resetPasswordExpire:{$gt:Date.now()}
        })
       
        if(!user)
        {
            return next(new ErrorResponse("Invlid reset token",400))

        }
        const salt =await bcrypt.genSalt(10)
        const pass =await bcrypt.hash(req.body.password,salt)
        
        User.updateOne({_id:user._id}, {$set:{password:pass,resetPasswordToken:"undefined"}}, {upsert: false}, function(err, data) {
            if (err) {
                res.status(500).send({error: "Could not modify student info..."});
            } else {           
               console.log(data)
                res.status(201).json({success:true,data:"Password reset successs"})
               
            }
        }); 
        
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
module.exports.userNames = async(req,res)=>
{        
      
       await User.find().sort({_id:-1})
        .then((data)=>{
            let array=[]
          for(let i=0;i<data.length;i++){
              array[i]=data[i].username
          }
            return res.send(array)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
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

module.exports.deleteUser=async(req,res)=>{
    
    const id=req.query.id
  
    await User.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
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

module.exports.updateUser=async(req,res)=>
{
    if(req.body.password){
        const user = await User.findById(req.params.id)
        user.password=req.body.password
        user.username=req.body.username
        user.email=req.body.email
        user.address=req.body.address
        user.cnic=req.body.cnic
        user.phoneNo=req.body.phoneNo
        user.description=req.body.description
        user.salary=req.body.salary
        user.role=req.body.role
        user.Class=req.body.Class
        user.section=req.body.section
        await user.save()
    res.send(200)
    }else{
    User.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify student info..."});
        } else {           
           
            sectionSchema.updateOne({title:req.body.section}, {$set:{teacher:req.body.username}})
           .then(
           res.status(200).send(data)

           )
        }
    }); }
}
module.exports.totalUsers=(req,res)=>{
    User.countDocuments({}
    ,function(error,data)  {
        if (error) {
            res.status(500).send({error: "Could not modify User info..."});
        } else {           
          
       return  res.status(200).send(String(data))}
    })
}