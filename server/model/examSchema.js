const mongoose=require('mongoose');

const ExamSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    Class:{
        type:String,
        trim:true,
    },
    section:{
        type:String,
        trim:true,
    },
    
   
},
{ timestamps: true });
const Exam=mongoose.model('Exam',ExamSchema);
module.exports=Exam
