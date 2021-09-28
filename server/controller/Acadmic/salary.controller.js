const Salary =require('../../model/salarySchema');
const User =require('../../model/user');



module.exports.addSalary=async (req,res)=>{   
try{   
    const title=req.body.title
    let username=''
    let employeeNo=req.body.employeeNo
    const salary=parseInt(req.body.amount,10)
    const person=req.body.createdBy
    let status='Unpaid'
    let type='salary'
    let pending=0
    let date= new Date()
    
    await User.find({employeeNo:employeeNo},(error,sdata) => {
         if (error) {
             return res.status(200).json({
                 success: true,
                 token: "No employee Found",
             })
             
         }else{
            if(sdata[0]){
                username=sdata[0].username;
                  const newSalary=  Salary.create({title,type,username,employeeNo,salary,pending,date,status,person})
                 return res.status(200).json({
                  success: true,
                  token: "Salary add successfully",
              })
                   
 
                 
             
     }else{
         return res.status(200).json({
                 success: true,
                 token: "No Employee Found",
             })            }

         }
     })
 
        }
  
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
}
module.exports.getSalary = async(req,res)=>
{  
    
      if(req.query.id !='')  {
       const {id}=req.query
      
       await Salary.find({_id:id}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
           
            res.send(data)
          
        }
    });
}
}
module.exports.getSalaryDeposite = async(req,res)=>
{  
    
      if(req.query.key !='')  {
       const {key}=req.query
      
      await Salary.find({type:'deposite',key:key}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
           
            res.send(data)
          
        }
    });
}
}

module.exports.salaries = async(req,res)=>
{        
       const month=req.query.month
       const status=req.query.status
       const employeeNo=req.query.employeeNo
       let type='salary'
       const year=req.query.year
    
       if(employeeNo!='')
       {
        await Salary.find({employeeNo:employeeNo,date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1}).limit(120)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       }else{
       await Salary.find({date: { $regex: month+'.*'+year },status: { $regex: status },type:type}).sort({_id:-1}).limit(120)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })}
       
}
module.exports.deleteSalary=async(req,res)=>{
    
    const id=req.query.id
    
   await Salary.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}
module.exports.deleteSalaryRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
   await Salary.deleteMany({date: { $regex: month+'.*'+year }},(error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}


module.exports.generateSalary = async(req,res)=>
{ 
    let person=req.body.createdBy
    let type='salary'
    let employeeNo=0
    let pending=0
    let status='Unpaid'
    let title='Monthly Salary'
    let salary=0
    let date=new Date()
    let username=''
    await User.find({}, (error,data) => {
            if (error) {
                return res.status(200).json({
                    success: true,
                    token: "No User Found",
                })
                
            }else{
                data.map(item => {   
                employeeNo=item.employeeNo;
                username=item.username
                salary=item.salary
                const newFee=  Salary.create({title,type,username,employeeNo,salary,pending,date,status,person})
            })
            return res.status(200).json({
                success: true,
                token: "Salary add successfully",
            }) 
            }
           
        }) 
        return res.status(200).json({
            success: true,
            token: "Salary Not add successfully",
        })
    
}
module.exports.paySalary=async(req,res)=>
{
    let id=req.body.id
    let employeeNo=req.body.employeeNo
    let title=req.body.title
    let salary=req.body.salary
    let pending=req.body.pending
    let payAmount=req.body.payAmount
    let person=req.body.receivedBy
    let username=req.body.name
    let status='Unpaid'
    let type='deposite'
    let key=req.body.key
    pending=parseInt(pending,10)+parseInt(payAmount,10)
    if(pending==salary){
        status='Paid'
    }
    let date=new Date()
    
        await Salary.updateOne({_id: id}, {$set:{salary:salary,pending:pending,status:status}}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify Fee info..."});
        } else {           
          pending=payAmount
           status='Paid'
            const newFee=  Salary.create({title,type,username,employeeNo,salary,pending,date,status,person,key})
            return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
         
           
        }
    }); 
}
module.exports.salaryDashboard=async(req,res)=>{
    
    const month=req.query.month
    const status=req.query.status
    let type='salary'
    const year=req.query.year
    
    await Salary.find({date: { $regex: month+'.*'+year },status: { $regex: status },type:type})
    .then((data)=>{
           
            const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
            const sum4=data.map(item=>item.salary).reduce((a,item)=>item+a)
            Salary.countDocuments({type:type,status:"Paid",date: { $regex: month+'.*'+year }}
            ,function(error,count) {
               
                Salary.countDocuments({type:type,status:"Unpaid",date: { $regex: month+'.*'+year }}
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

    module.exports.salaryReport=async(req,res)=>{
        const month=req.query.month
        let type='deposite'
        const year=req.query.year
    
       await Salary.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type} },
        {$group: {_id:"$title",amount:{"$sum":"$pending"}} }
    ])
        .then((data)=>{
            
       
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.salaryR2f1=async(req,res)=>{
        let type='deposite'
        const month=req.query.month
        const year=req.query.year
    
       await Salary.aggregate([{ $match: {date: { $regex: month+'.*'+year},type:type} },
        {$group: {_id:"$role",amount:{"$sum":"$pending"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    
    module.exports.salaryReportRole=async(req,res)=>{
        const month=req.query.month
        let type='deposite'
        const year=req.query.year
    
       await Salary.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type} },
        {$group: {_id:"$person",amount:{"$sum":"$pending"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.salaryGeneralReport=async(req,res)=>{
        let type='deposite'
        const month=req.query.month
        const year=req.query.year
    
    
    await Salary.find({date: { $regex: month+'.*'+year },type:type})
        .then((data)=>{    
               const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
               return res.send((sum3).toString())
        })  .catch( (err)=>{
            return res.status(200)
         })
    }
   
    module.exports.salaryStaffReport=async(req,res)=>{
        const month=req.query.month
        const year=req.query.year
    
        let type2='deposite'
        await Salary.aggregate([{ $match: {date: { $regex: month+'.*'+year },type:type2} },
            {$group: {_id:"$username",amount:{"$sum":"$pending"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
    } 