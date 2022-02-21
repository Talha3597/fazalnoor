const Fee =require('../../model/feeSchema');
const FeeDeposite =require('../../model/feeDepositeSchema');
const StudentSchema =require('../../model/studentSchema');



module.exports.addFee=async (req,res)=>{
    
        
       
try{ 
           const title=req.body.title
           const Class=req.body.Class
           const section=req.body.section
           let studentNo=req.body.studentNo
           const amount=parseInt(req.body.amount,10)
           const person=req.body.createdBy
           let status='Unpaid'
           let discount=0
           let pending=0
           let date=req.body.date
           let studentName=''
           if(studentNo!=='')
           {
           await StudentSchema.find({studentNo:studentNo},(error,sdata) => {
                if (error) {
                    return res.status(200).json({
                        success: true,
                        token: "No Student Found",
                    })
                    
                }else{
                   if(sdata[0]){
                   
                       const Class=sdata[0].Class;
                       const section=sdata[0].section;
                       studentName=sdata[0].studentName;
                       if(amount>0){
                         const newFee=  Fee.create({title,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                        return res.status(200).json({
                         success: true,
                         token: "Fee add successfully",
                     })
                    }
                          
        
                        
                    
            }else{
                return res.status(200).json({
                        success: true,
                        token: "No Student Found",
                    })            }

                }
            })
        }
        else if(studentNo=='' && section!='' && Class!='')
        {
            
           await StudentSchema.find({section:section,Class:Class}, (error,data) => {
                if (error) {
                    return res.status(200).json({
                        success: true,
                        token: "No Students Found",
                    })
                    
                }else{
                   
                    data.map(item => {   
                                studentNo=item.studentNo;
                                studentName=item.studentName;
                                const Class=item.Class;
                                const section=item.section
                                if(amount>0){
                               const newFee=  Fee.create({title,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                                }
                })
                return res.status(200).json({
                    success: true,
                    token: "Fee add successfully",
                })
                }
               
            }) 
            return res.status(200).json({
                success: true,
                token: "Fees Not add successfully",
            })
        }
        else if(studentNo=='' && section=='' && Class!='')
        {
            await StudentSchema.find({Class:Class}, (error,data) => {
                if (error) {
                    return res.status(200).json({
                        success: true,
                        token: "No Students Found",
                    })
                    
                }else{
                   
                    data.map(item => {   
                                studentNo=item.studentNo;
                                studentName=item.studentName;
                                const Class=item.Class;
                                const section=item.section
                                if(amount>0){
                               const newFee=  Fee.create({title,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                    }
                })
                return res.status(200).json({
                    success: true,
                    token: "Fee add successfully",
                })
                }
               
            }) 
            return res.status(200).json({
                success: true,
                token: "Fees Not add successfully",
            })
        }
        else if( section !='' && Class=='')
        {
            await StudentSchema.find({section:section}, (error,data) => {
                if (error) {
                    return res.status(200).json({
                        success: true,
                        token: "No Students Found",
                    })
                    
                }else{
                   
                    data.map(item => {      
                                studentNo=item.studentNo;
                                studentName=item.studentName;
                                const Class=item.Class;
                                const section=item.section
                                if(amount>0){
                               const newFee=  Fee.create({title,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                    }
                })
                return res.status(200).json({
                    success: true,
                    token: "Fee add successfully",
                })
                }
               
            }) 
            return res.status(200).json({
                success: true,
                token: "Fees Not add successfully",
            })
        }
             
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getFee = async(req,res)=>
{  
    
      if(req.query.id !='')  {
       const {id}=req.query
     
      await Fee.find({_id:id}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
           
            res.send(data)
          
        }
    });
}
}
module.exports.getDeposite = async(req,res)=>
{  
    
      if(req.query.invoiceNo !='')  {
       const {invoiceNo}=req.query
      
      await FeeDeposite.find({invoiceNo:invoiceNo}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            res.send(data)
          
        }
    });
}
}

module.exports.fees = async(req,res)=>
{        
    const month=req.query.month
    const status=req.query.status
    const Class=req.query.Class
    const section=req.query.section
    const studentNo=req.query.studentNo
    const year=req.query.year
    let size=Number(req.query.size)
       let page=Number(req.query.page) 
    if(studentNo!=''){
        await  Fee.find({studentNo:studentNo,date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1})
         .then((data)=>{
             return res.send(data)}
             )
             .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
     }
   
   else if(Class !=''&& section !=''){
        await Fee.find({Class:Class,section:section,date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).skip((page-1)*size).limit(size)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
       }
   else if(Class!=''&& section==''){
        await Fee.find({Class:Class,date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).skip((page-1)*size).limit(size)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
       }
    else if(Class==''&& section!=''){
        await Fee.find({section:section,date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).skip((page-1)*size).limit(size)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
       }
    else if(Class=='' && section==''){
       await Fee.find({date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).skip((page-1)*size).limit(size)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
}
module.exports.deleteFee=async(req,res)=>{
    
    const id=req.query.id
    
   await Fee.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}
module.exports.deleteFeeRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
   await Fee.deleteMany({date: { $regex: month+'-'+year }},(error, data) => {
        if (error) {
            
            throw error;
        } else {
             FeeDeposite.deleteMany({date: { $regex: month+'-'+year }},(error, data) => {
                if (error) {
                    
                    throw error;
                } else {
                    
                    res.status(204).json(data);
                    
                }
            });
        }
    });
}


module.exports.generateFee = async(req,res)=>

{
let person=req.body.createdBy
let studentNo=0
let pending=0
let status='Unpaid'
let discount=0
let title='School Fee'
let amount=0
let date=req.body.date
let studentName=''
await StudentSchema.find({}, (error,data) => {
        if (error) {
            return res.status(200).json({
                success: true,
                token: "No Students Found",
            })
            
        }else{
            data.map(item => {   
            studentNo=item.studentNo;
            amount=item.fee
            studentName=item.studentName;
            const Class=item.Class;
            const section=item.section
            if(amount>0){
            const newFee=  Fee.create({title,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
            }
        })
        return res.status(200).json({
            success: true,
            token: "Fee add successfully",
        }) 
        }
       
    }) 
   

}
module.exports.payFee=async(req,res)=>
{
    let Class=req.body.Class
    let section=req.body.section
    let id=req.body.id
    let studentNo=req.body.studentNo
    let title=req.body.title
    let amount=req.body.amount
    let pending=req.body.pending
    let discount=req.body.discount
    let payAmount=req.body.payAmount
    let person=req.body.receivedBy
    studentName=req.body.studentName
    let status='Unpaid'
    let invoiceNo=req.body.invoiceNo
    pending=parseInt(pending,10)+parseInt(payAmount,10)
    if(pending==amount){
        status='Paid'
    }
    let date=req.body.date
  
    if(discount>0){
        await Fee.updateOne({_id: id}, {$set:{amount:amount,discount:discount,pending:pending,status:status}}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify Fee info..."});
        } else {           
          pending=payAmount
           status='Paid'
            const newFee=  FeeDeposite.create({title,studentNo,amount,pending,date,status,Class,section,person,invoiceNo})
            return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
         
           
        }
    }); }else{
        await Fee.updateOne({_id: id}, {$set:{amount:amount,pending:pending,status:status}}, {upsert: true}, function(err, data) {
            if (err) {
                res.status(500).send({error: "Could not modify Fee info..."});
            } else {           
              pending=payAmount
               status='Paid'
                const newFee=  FeeDeposite.create({title,studentNo,amount,pending,date,status,Class,section,person,invoiceNo})
                return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
             
               
            }
        }); 
    }            
}
//{$match:{}},{$group:{_id:"$balance",balance:{$sum:"$balance"}}}
module.exports.feeDashboard=async(req,res)=>{
const month=req.query.month
const status=req.query.status
    const Class=req.query.Class
    const section=req.query.section
    const year=req.query.year
    
    if(Class!=''&& section=='')
    {await Fee.find({Class:Class ,date: { $regex: month+'-'+year },status: { $regex: status }})
    .then((data)=>{
       
        
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
           Fee.countDocuments({Class:Class,status:"Paid",date: { $regex: month+'-'+year }}
           ,function(error,count) {
              
               Fee.countDocuments({Class:Class,status:"Unpaid",date: { $regex: month+'-'+year }}
               ,function(error,count1)  {
                   
                  
                  let array=[sum3,sum4,count,count1]
           
                  return res.send(array)
               })
           })
        })
            
        .catch( (err)=>{
       return res.status(200).json({success:true, token:'Error Loading Data'})
    })
    }
    else if(Class==''&& section!='')
    {await Fee.find({section:section ,date: { $regex: month+'-'+year },status: { $regex: status }})
    .then((data)=>{
       
        
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
           Fee.countDocuments({section:section,status:"Paid",date: { $regex: month+'-'+year }}
           ,function(error,count) {
              
               Fee.countDocuments({section:section,status:"Unpaid",date: { $regex: month+'-'+year }}
               ,function(error,count1)  {
                   
                  
                  let array=[sum3,sum4,count,count1]
           
                  return res.send(array)
               })
           })
        })
            
        .catch( (err)=>{
       return res.status(200).json({success:true, token:'Error Loading Data'})
    })
    }
  else  if(Class!=''&& section!=''){
await Fee.find({Class:Class,section:section ,date: { $regex: month+'-'+year },status: { $regex: status },})
.then((data)=>{
       const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
        const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
        Fee.countDocuments({Class:Class,section:section,status:"Paid",date: { $regex: month+'-'+year }}
        ,function(error,count) {
           
            Fee.countDocuments({Class:Class,section:section,status:"Unpaid",date: { $regex: month+'-'+year }}
            ,function(error,count1)  {
                
               
               let array=[sum3,sum4,count,count1]
        
               return res.send(array)
            })
        })
    })
        
    .catch( (err)=>{
   return res.status(200).json({success:true, token:'Error Loading Data'})
})
    }
  else if(Class==''&& section=='')
    {await Fee.find({date: { $regex: month+'-'+year },status: { $regex: status }})
    .then((data)=>{
           
           
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
            const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
            Fee.countDocuments({status:"Paid",date: { $regex: month+'-'+year }}
            ,function(error,count) {
               
                Fee.countDocuments({status:"Unpaid",date: { $regex: month+'-'+year }}
                ,function(error,count1)  {
                    
                   
                   let array=[sum3,sum4,count,count1]
            
                   return res.send(array)
                })
            })
           
          
        })
            
        .catch( (err)=>{
       return res.status(200).json({success:true, token:'Error Loading Data'})
    })
    }
  
}
module.exports.feeGeneralReport=async(req,res)=>{
   
const month=req.query.month
const year=req.query.year
    
await FeeDeposite.find({date: { $regex: month+'-'+year }})
    .then((data)=>{    
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           return res.send((sum3).toString())
    })  .catch( (err)=>{
        return res.send('')
     })
}
module.exports.feeFineReport=async(req,res)=>{
    let type='deposite'
    let title='Fine'
    const year=req.query.year
const month=req.query.month
await FeeDeposite.find({date: { $regex: month+'-'+year},title:title})
    .then((data)=>{    
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           return res.send((sum3).toString())
    })  .catch( (err)=>{
        return res.send('')
     })
}
module.exports.feeReport=async(req,res)=>{
    const month=req.query.month
    const year=req.query.year
    
   await FeeDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
    {$group: {_id:"$title",amount:{"$sum":"$pending"}} }
])
    .then((data)=>{
       
        return res.send(data)})
    .catch( (err)=>{
        return res.status(200).json({success:true, token:'Error Loading Data'})
    })

}
module.exports.feeR2f1=async(req,res)=>{
    const month=req.query.month
    const year=req.query.year
    
   await FeeDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
    {$group: {_id:"$Class",amount:{"$sum":"$pending"}} }
])
    .then((data)=>{
       
        return res.send(data)})
    .catch( (err)=>{
        return res.status(200).json({success:true, token:'Error Loading Data'})
    })

}
module.exports.feeReportRole=async(req,res)=>{
    const month=req.query.month
    const year=req.query.year
    
   await FeeDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
    {$group: {_id:"$person",amount:{"$sum":"$pending"}} }
])
    .then((data)=>{
       
        return res.send(data)})
    .catch( (err)=>{
        return res.status(200).json({success:true, token:'Error Loading Data'})
    })

}
module.exports.feeReportExpensive= async(req,res)=>
{        
    const month=req.query.month
    const year=req.query.year
   
        await FeeDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year  }} },
            {$group: {_id:"$studentNo",pending:{"$sum":"$pending"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
        
    
}
