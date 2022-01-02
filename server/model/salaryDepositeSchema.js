const mongoose=require('mongoose') 
const SalaryDepositeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
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
});

var SalaryDeposite = mongoose.model('SalaryDeposite', SalaryDepositeSchema);
module.exports=SalaryDeposite