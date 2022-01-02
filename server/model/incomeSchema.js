const mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 

const IncomeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    }, 
    incomeCategory:{
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
    receivedBy:{
        type:String,
        trim:true,
        required:true,
    }
},
{ timestamps: true });
IncomeSchema.plugin(autoIncrement.plugin, { model: 'Income', field: 'invoiceNo',startAt: 1,  });

var Income=mongoose.model('Income',IncomeSchema);
module.exports=Income