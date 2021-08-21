const mongoose=require('mongoose');

const NoticeBoardSchema=mongoose.Schema({
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
const NoticeBoard=mongoose.model('NoticeBoard',NoticeBoardSchema);
module.exports=NoticeBoard