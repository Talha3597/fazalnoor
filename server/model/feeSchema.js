const mongoose=require('mongoose') 
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 

const FeeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    },
    type:{
        type:String,
        trim:true,
        
    },
    studentName:{
        type:String,
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
    discount:{
        type:Number,
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
        
    },section:{
        type:String,
        trim:true,
        
    },
    person:{
        type:String,
        trim:true,
       
    },
    key:{
        type:Number,
        trim:true,
        
    },
});
FeeSchema.plugin(autoIncrement.plugin, { model: 'Fee', field: 'invoiceNo' });
var Fee = mongoose.model('Fee', FeeSchema);
module.exports=Fee