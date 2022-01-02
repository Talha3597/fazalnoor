const mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 

const StudentSchema=mongoose.Schema({
    studentNo:{
        type:Number,
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
   
},
{ timestamps: true });
StudentSchema.plugin(autoIncrement.plugin, { model: 'Student', field: 'studentNo',startAt: 1,  });

const Student=mongoose.model('Student',StudentSchema);
module.exports=Student


