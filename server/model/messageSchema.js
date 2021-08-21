const mongoose=require('mongoose');

const MessageSchema=mongoose.Schema({
    to:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    text:{
        type:String,
        trim:true,
        
    },
    date:{
        type:String,
        trim:true,
        
    },
    
},
{ timestamps: true });
const Message=mongoose.model('Message',MessageSchema);
module.exports=Message