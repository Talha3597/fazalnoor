const mongoose=require('mongoose') 


const FeeDepositeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    },
    studentNo:{
        type:Number,
        trim:true,
        
    }, 
    amount:{
        type:Number,
        required:true,

        trim:true,
        
    }, 
    pending:{
        type:Number,
        required:true,

        trim:true,
    }, 
    invoiceNo:{
        type:Number,
        trim:true,
        
    }, 
    date:{
        type:String,
        trim:true,
        
    },
    status:{
        type:String,
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
    person:{
        type:String,
        trim:true,
       
    },
   
});
var FeeDeposite = mongoose.model('FeeDeposite', FeeDepositeSchema);
module.exports=FeeDeposite