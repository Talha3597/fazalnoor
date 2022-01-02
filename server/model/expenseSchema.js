const mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 

const ExpenseSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    ExpenseCategory:{
        type:String,
        
        trim:true,
        
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        
    }, 
    invoiceNo:{
        type:Number,
        trim:true,
        
    }, 
    note:{
        type:String,
        trim:true,
        
    },
   
  
    date:{
        type:String,
        trim:true,
        
    },
    createdBy:{
        type:String,
        trim:true,
        required:true,
    }
},
{ timestamps: true });
ExpenseSchema.plugin(autoIncrement.plugin, { model: 'Expense', field: 'invoiceNo',startAt: 1,  });
var Expense=mongoose.model('Expense',ExpenseSchema);
module.exports=Expense