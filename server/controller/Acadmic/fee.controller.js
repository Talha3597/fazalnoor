const Fee =require('../../model/feeSchema');
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
           let type='fee'
           let discount=0
           let pending=0
           let date= new Date()
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
                         const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                        return res.status(200).json({
                         success: true,
                         token: "Fee add successfully",
                     })
                          
        
                        
                    
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
                        
                       
                               
                                studentNo=item.studentNo;
                                studentName=item.studentName;
                                const Class=item.Class;
                                const section=item.section
                               const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                              
                            
                        
                    
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
                        
                       
                               
                                studentNo=item.studentNo;
                                studentName=item.studentName;
                                const Class=item.Class;
                                const section=item.section
                               const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                              
                            
                        
                    
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
    
      if(req.query.key !='')  {
       const {key}=req.query
      
      await Fee.find({type:'deposite',key:key}, (error, data) => {
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
    const type='fee'
    const year=req.query.year
    
    if(studentNo!=''){
        await  Fee.find({studentNo:studentNo,date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1})
         .then((data)=>{
             return res.send(data)}
             )
             .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
     }
   
   else if(Class !=''&& section !=''){
        await Fee.find({Class:Class,section:section,date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1}).limit(200)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
       }
   else if(Class!=''&& section==''){
        await Fee.find({Class:Class,date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1}).limit(200)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
       }
    else if(Class=='' && section==''){
       await Fee.find({date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1}).limit(200)
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
    
   await Fee.deleteMany({date: { $regex: month+'.*'+year },status:'Paid'},(error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}


module.exports.generateFee = async(req,res)=>

{
let person=req.body.createdBy
let type='fee'
let studentNo=0
let pending=0
let status='Unpaid'
let discount=0
let title='School Fee'
let amount=0
let date=new Date()
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
            const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
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
    let type='deposite'
    let key=req.body.key
    pending=parseInt(pending,10)+parseInt(payAmount,10)
    if(pending==amount){
        status='Paid'
    }
    let date=new Date()
    if(discount>0){
        await Fee.updateOne({_id: id}, {$set:{amount:amount,discount:discount,pending:pending,status:status}}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify Fee info..."});
        } else {           
          pending=payAmount
           status='Paid'
            const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person,key})
            return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
         
           
        }
    }); }else{
        await Fee.updateOne({_id: id}, {$set:{amount:amount,pending:pending,status:status}}, {upsert: true}, function(err, data) {
            if (err) {
                res.status(500).send({error: "Could not modify Fee info..."});
            } else {           
              pending=payAmount
               status='Paid'
                const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person,key})
                return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
             
               
            }
        }); 
    }

    
  
   
            
}
//{$match:{}},{$group:{_id:"$balance",balance:{$sum:"$balance"}}}
module.exports.feeDashboard=async(req,res)=>{
    let type='fee'
const month=req.query.month
const status=req.query.status
    const Class=req.query.Class
    const section=req.query.section
    const year=req.query.year
    
    if(Class!=''&& section=='')
    {await Fee.find({Class:Class ,date: { $regex: month+'.*'+year },status: { $regex: status },type:type})
    .then((data)=>{
       
        
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
           Fee.countDocuments({Class:Class,type:type,status:"Paid",date: { $regex: month+'.*'+year }}
           ,function(error,count) {
              
               Fee.countDocuments({Class:Class,type:type,status:"Unpaid",date: { $regex: month+'.*'+year }}
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
await Fee.find({Class:Class,section:section ,date: { $regex: month+'.*'+year },status: { $regex: status },type:type})
.then((data)=>{
       const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
        const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
        Fee.countDocuments({Class:Class,section:section,type:type,status:"Paid",date: { $regex: month+'.*'+year }}
        ,function(error,count) {
           
            Fee.countDocuments({Class:Class,section:section,type:type,status:"Unpaid",date: { $regex: month+'.*'+year }}
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
    {await Fee.find({date: { $regex: month+'.*'+year },status: { $regex: status },type:type})
    .then((data)=>{
           
           
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
            const sum4=data.map(item=>item.amount).reduce((a,item)=>item+a)
            Fee.countDocuments({type:type,status:"Paid",date: { $regex: month+'.*'+year }}
            ,function(error,count) {
               
                Fee.countDocuments({type:type,status:"Unpaid",date: { $regex: month+'.*'+year }}
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
    let type='deposite'
const month=req.query.month
const year=req.query.year
    
await Fee.find({date: { $regex: month+'.*'+year },type:type})
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
await Fee.find({date: { $regex: month+'.*'+year},type:type,title:title})
    .then((data)=>{    
           const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
           return res.send((sum3).toString())
    })  .catch( (err)=>{
        return res.send('')
     })
}
module.exports.feeReport=async(req,res)=>{
    const month=req.query.month
    let type='deposite' 
    const year=req.query.year
    
   await Fee.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type} },
    {$group: {_id:"$title",amount:{"$sum":"$pending"}} }
])
    .then((data)=>{
       
        return res.send(data)})
    .catch( (err)=>{
        return res.status(200).json({success:true, token:'Error Loading Data'})
    })

}
module.exports.feeR2f1=async(req,res)=>{
    let type='deposite'
    const month=req.query.month
    const year=req.query.year
    
   await Fee.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type} },
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
    
    let type="deposite"
   await Fee.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type} },
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
    const Class=req.query.Class
    const section=req.query.section
    const studentNo=req.query.studentNo
    const type='deposite'
   
    if(studentNo){
        await Fee.aggregate([{ $match: {studentNo:studentNo,date: { $regex:  month+'.*'+year },type:type} },
            {$group: {_id:"$studentNo",pending:{"$sum":"$pending"},amount:{"$sum":"$amount"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
       }
   else if(Class && section ){
    await Fee.aggregate([{ $match: {Class:Class,section:section,date: { $regex:  month+'.*'+year },type:type} },
        {$group: {_id:"$studentNo",pending:{"$sum":"$pending"},amount:{"$sum":"$amount"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    }
    else if(Class){
        await Fee.aggregate([{ $match: {Class:Class,date: { $regex:  month+'.*'+year },type:type} },
            {$group: {_id:"$studentNo",pending:{"$sum":"$pending"},amount:{"$sum":"$amount"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
        }
    else {
        await Fee.aggregate([{ $match: {date: { $regex: month+'.*'+year  },type:type} },
            {$group: {_id:"$studentNo",pending:{"$sum":"$pending"},amount:{"$sum":"$amount"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
        
    } 
}
