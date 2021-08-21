const mongoose=require('mongoose');

const StudentSchema=mongoose.Schema({
    studentNo:{
        type:Number,
        unique:true,
         trim:true,
        
    },
    studentName:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        trim:true,
        
    },
   
    rollNo:{
        type:Number,
      //  unique:true,
        trim:true,
       
    },
    Class:{
        type:String,
        //required:true,
        trim:true,
    },
    section:{
        type:String,
        trim:true,
    },
    dob:{
        type:String,
      //  unique:true,
        trim:true,
       
    },
    address:{
        type:String,
        trim:true,
    },
    photo:{
        type:String,
        trim:true,
    },
    parentName:{
        type:String,
        required:true,
        trim:true,
        
    },
    phoneNo:{
        type:String,
        trim:true,
    
    },
    fee:{
        type:Number,
        required:true,
        trim:true,
    
    },cnic:{
        type:String,
        trim:true,
    
    },
    parentRelation:{
        type:String,
        trim:true,
        
    },
    description:{
        type:String,
        trim:true,
        
    },
    group:{
        type:String,
        trim:true,
        
    },
},
{ timestamps: true });
const Student=mongoose.model('student',StudentSchema);
module.exports=Student