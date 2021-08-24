const Expense =require('../../model/expenseSchema');
const Salary =require('../../model/salarySchema');


module.exports.addExpense=async (req,res)=>{
    
        
       
try{ 

       
       
        
           
           const title=req.body.title
           const ExpenseCategory=req.body.ExpenseCategory
           const amount=req.body.amount
           
           const note=req.body.note
           const createdBy=req.body.createdBy
           const date=new Date()
           
           const newExpense=  Expense.create({title,ExpenseCategory,amount,date,note,createdBy})
           
            
           return res.status(200).json({
                success: true,
                token: "Expense add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getExpense = async(req,res)=>
{        
       const {id}=req.query
       
       Expense.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.Expenses = async(req,res)=>
{        
    const month=req.query.month
    const year=req.query.year
   
       await Expense.find({date: { $regex: month+'.*'+year }}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       
}
module.exports.deleteExpense=(req,res)=>{
    
    const id=req.query.id
    
    Expense.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}
module.exports.deleteExpenseRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
   await Expense.deleteMany({date: { $regex: month+'.*'+year }},(error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}

module.exports.updateExpense=(req,res)=>
{
    
    Expense.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify Expense info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
module.exports.expenseDashboard=async(req,res)=>{
    let type='deposite'
    const month=req.query.month
    const year=req.query.year
    
    let data =await Expense.find({date: { $regex: month+'.*'+year }})
    let sdata=await Salary.find({date: { $regex: month+'.*'+year },type:type}) 
    if(data[0] && sdata[0]){
        let sum =data.map(item=>item.amount).reduce((a,item)=>item+a)
        let sum3=sdata.map(item=>item.pending).reduce((a,item)=>item+a)
            return res.send((sum+"+"+sum3).toString())}
    else if(data[0] && !sdata[0]){
        let sum =data.map(item=>item.amount).reduce((a,item)=>item+a)
        return res.send((sum+"+0").toString())
        }
    else if(!data[0] && sdata[0]){
        let sum3=sdata.map(item=>item.pending).reduce((a,item)=>item+a)
        return res.send(("0+"+sum3).toString())
        }
    else{
                return res.send(("0+0").toString())
            }
    
   
           
            
            
             
    }
    module.exports.expenseReport=async(req,res)=>{
        const month=req.query.month
        const year=req.query.year
    
       await Expense.aggregate([{ $match: {date: { $regex: month+'.*'+year }} },
        {$group: {_id:"$title",amount:{"$sum":"$amount"}} }
    ])
        .then((data)=>{
            
       
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.expenseReportRole=async(req,res)=>{
        const month=req.query.month
        const year=req.query.year
   
       await Expense.aggregate([{ $match: {date: { $regex: month+'.*'+year }} },
        {$group: {_id:"$createdBy",amount:{"$sum":"$amount"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
   
         