const mongoose=require('mongoose');

const HomeWorkSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    notice:{
        type:String,
        required:true,
        trim:true,
        
    },
    url:{
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
    
    status:{
        type:String,
        trim:true,
        
    },
    attachment:{
        type:String,
        trim:true,
        
    },
    date:{
        type:String,
        trim:true,
        
    },
},
{ timestamps: true });
const HomeWork=mongoose.model('HomeWork',HomeWorkSchema);
module.exports=HomeWork
