const mongoose=require('mongoose');
const bcrypt =require('bcryptjs')

const SchoolInfoSchema=mongoose.Schema({
    principalMessage:{
        type:String,
        trim:true,
        
    }, 
    mission:{
        type:String,
        trim:true,
    },
    schoolName:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    phoneNo:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    whatsapp:{
        type:String,
        trim:true,
    },  
    facebook:{
        type:String,
        trim:true,
    },  
    map:{
        type:String,
        trim:true,
    },
    
   
},
);


const SchoolInfo=mongoose.model('SchoolInfo',SchoolInfoSchema);
module.exports=SchoolInfo
