const mongoose=require('mongoose') 
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 

const SalarySchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    },
    type:{
        type:String,
        trim:true,
        
    },
    username:{
        type:String,
        trim:true,
        
    },
    employeeNo:{
        type:Number,
        trim:true,
        
    }, 

    salary:{
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
    person:{
        type:String,
        trim:true,
       
    },
    key:{
        type:Number,
        trim:true,
        
    },
});
SalarySchema.plugin(autoIncrement.plugin, { model: 'Salary', field: 'invoiceNo' });
var Salary = mongoose.model('Salary', SalarySchema);
module.exports=Salary