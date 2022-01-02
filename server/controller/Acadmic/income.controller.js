const Income =require('../../model/incomeSchema');
const Fee =require('../../model/feeSchema');
const FeeDeposite = require('../../model/feeDepositeSchema');


module.exports.addIncome=async (req,res)=>{     
try{  
           const title=req.body.title
           const incomeCategory=req.body.incomeCategory
           const amount=req.body.amount
           const note=req.body.note
           const receivedBy=req.body.receivedBy
           const date=req.body.date
           
           const newIncome=  Income.create({title,incomeCategory,amount,date,note,receivedBy})
           
            
           return res.status(200).json({
                success: true,
                token: "Income add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getIncome = async(req,res)=>
{        
       const {id}=req.query
       
       Income.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.incomes = async(req,res)=>
{    
    const month=req.query.month
    const year=req.query.year
    
       await Income.find({date: { $regex: month+'-'+year }}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       
}
module.exports.deleteIncome=(req,res)=>{
    
    const id=req.query.id
    
    Income.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}
module.exports.deleteIncomeRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
   await Income.deleteMany({date: { $regex: month+'-'+year }},(error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}

module.exports.updateIncome=(req,res)=>
{
    
    Income.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify income info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
module.exports.incomeDashboard=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
    let data =await Income.find({date: { $regex: month+'-'+year }})
    let fdata=await FeeDeposite.find({date: { $regex: month+'-'+year },}) 
    if(data[0] && fdata[0]){
        let sum =data.map(item=>item.amount).reduce((a,item)=>item+a)
        let sum3=fdata.map(item=>item.pending).reduce((a,item)=>item+a)
            return res.send((sum+sum3).toString())}
    else if(data[0] && !fdata[0]){
        let sum =data.map(item=>item.amount).reduce((a,item)=>item+a)
        return res.send((sum).toString())
        }
    else if(!data[0] && fdata[0]){
        let sum3=fdata.map(item=>item.pending).reduce((a,item)=>item+a)
        return res.send((sum3).toString())
        }
    else{
                return res.send(("0").toString())
            }
    
   
           
            
            
             
    }

           
    
    module.exports.incomeReport=async(req,res)=>{
        const month=req.query.month
        const year=req.query.year
    
       await Income.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
        {$group: {_id:"$title",amount:{"$sum":"$amount"}} }
    ])
        .then((data)=>{
            
       
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.incomeReportRole=async(req,res)=>{
        const month=req.query.month
        const year=req.query.year
    
       await Income.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
        {$group: {_id:"$receivedBy",amount:{"$sum":"$amount"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
   