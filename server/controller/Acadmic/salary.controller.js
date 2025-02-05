const Salary =require('../../model/salarySchema');
const SalaryDeposite =require('../../model/salaryDepositeSchema');
const UserAttendance =require('../../model/attendanceSchemaUser');
const User =require('../../model/user');



module.exports.addSalary=async (req,res)=>{   
try{   
    const title=req.body.title
    let username=''
    let employeeNo=req.body.employeeNo
    const salary=parseInt(req.body.amount,10)
    const person=req.body.createdBy
    let status='Unpaid'
    let pending=0
    let date= req.body.date
    
    await User.find({employeeNo:employeeNo},(error,sdata) => {
         if (error) {
             return res.status(200).json({
                 success: true,
                 token: "No employee Found",
             })
             
         }else{
            if(sdata[0]){
                username=sdata[0].username;
                  const newSalary=  Salary.create({title,username,employeeNo,salary,pending,date,status,person})
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
    
      if(req.query.invoiceNo !='')  {
       const {invoiceNo}=req.query
      
      await SalaryDeposite.find({invoiceNo:invoiceNo}, (error, data) => {
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
       const year=req.query.year
    
       if(employeeNo!='')
       {
        await Salary.find({employeeNo:employeeNo,date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).limit(120)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       }else{
       await Salary.find({date: { $regex: month+'-'+year },status: { $regex: status }}).sort({_id:-1}).limit(120)
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
    
   await Salary.deleteMany({date: { $regex: month+'-'+year }},(error, data) => {
         if (error) {
            
            throw error;
        } else {
            
            SalaryDeposite.deleteMany({date: { $regex: month+'-'+year }},(error, data) => {
                if (error) {
                   
                   throw error;
               } else {
                   
                   res.status(204).json(data);
                   
               }
           });
            
        }
    });
}
const salaryDeduction=(employeeNo,salary,attendanceData)=>{
    let presents=0
    let absents=0
    attendanceData.map(i=>{
        let user=i.presentUsers.find(p=>p.employeeNo == employeeNo)
        if(user) {
             presents = presents+1
        }
        else{
             absents =absents+1
        }
      })
 if(absents>2){
      let deduct =Math.round((salary/30)*(absents-2))
      return deduct
 }
 else{
     return ''
 }
}

module.exports.generateSalary = async(req,res)=>
{ 
    let person=req.body.createdBy
    let employeeNo=0
    let pending=0
    let status='Unpaid'
    let title='Monthly Salary'
    let salary=0
    let date=req.body.date
    let d=date.split('-')
    let year=d[2]
    let month=d[1]
    if(month==1){
        month=12
        year=year-1
      
    }
    let attendanceData=[]
    let username=''
    await UserAttendance.find({date:{ $regex: year+'-'+month+'-' }}, (error,data) => {
        if (error) {
            return res.status(200).json({
                success: true,
                token: "No User Found",
            })
            
        }else{
            attendanceData=data
        }})
        if(attendanceData[2]){
             User.find({}, (error,data) => {
                if (error) {
                    return res.status(200).json({
                        success: true,
                        token: "No User Found",
                    })
                    
                }else{
                    data.map(item => { 
                      let deduct=salaryDeduction(item.employeeNo,item.salary,attendanceData)
                     if(deduct){
                        employeeNo=item.employeeNo;
                        username=item.username
                        salary=item.salary
                        pending=deduct
                        type='salary'
                        title='Monthly Salary'
                        status='Unpaid'
                        
                       let invoiceNo=0
                        var newFee= new  Salary()
                        newFee.title=title
                        newFee.type=type
                        newFee.username=username
                        newFee.employeeNo=employeeNo
                        newFee.salary=salary
                        newFee.pending=pending
                        newFee.date=date
                        newFee.status=status
                        newFee.person=person
                        newFee.save(function(err,data) {
                            invoiceNo=data.invoiceNo
                            title='Leave Deduction'
                            status='Paid'
                            pending=deduct 
                            salary=deduct   
                            const newFee1=   SalaryDeposite.create({title,username,employeeNo,salary,pending,date,status,person,invoiceNo})
                       
                         });
                          
                     }
                     else{
                        employeeNo=item.employeeNo;
                        username=item.username
                        salary=item.salary
                        title='Monthly Salary'
                        status='Unpaid'
                        pending=0
                        const newFee2=  Salary.create({title,username,employeeNo,salary,pending,date,status,person})    
                        
                     
                    }   
                       })
                return res.status(200).json({
                    success: true,
                    token: "Salary add successfully",
                }) 
                }
               
            }) 
        }else{
             User.find({}, (error,data) => {
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
                        const newFee3=  Salary.create({title,username,employeeNo,salary,pending,date,status,person})    
                     } )  
                       
                return res.status(200).json({
                    success: true,
                    token: "Salary add successfully",
                }) 
                }
               
            }) 
        }
   
      
    
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
    let invoiceNo=req.body.invoiceNo
    pending=parseInt(pending,10)+parseInt(payAmount,10)
    if(pending==salary){
        status='Paid'
    }
    let date=req.body.date
    
        await Salary.updateOne({_id: id}, {$set:{salary:salary,pending:pending,status:status}}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify Fee info..."});
        } else {           
          pending=payAmount
           status='Paid'
           salary=payAmount
            const newFee=  SalaryDeposite.create({title,username,employeeNo,salary,pending,date,status,person,invoiceNo})
            return res.status(200).json({success:true,message:`${payAmount} Rs  PAID` });
         
           
        }
    }); 
}
module.exports.salaryDashboard=async(req,res)=>{
    
    const month=req.query.month
    const status=req.query.status
    const year=req.query.year
    
    await Salary.find({date: { $regex: month+'-'+year },status: { $regex: status },})
    .then((data)=>{
           
            const sum3=data.map(item=>item.pending).reduce((a,item)=>item+a)
            const sum4=data.map(item=>item.salary).reduce((a,item)=>item+a)
            Salary.countDocuments({status:"Paid",date: { $regex: month+'-'+year }}
            ,function(error,count) {
               
                Salary.countDocuments({status:"Unpaid",date: { $regex: month+'-'+year }}
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
       
        const year=req.query.year
    
       await SalaryDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
        {$group: {_id:"$title",amount:{"$sum":"$pending"}} }
    ])
        .then((data)=>{
            
       
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.salaryR2f1=async(req,res)=>{
       
        const month=req.query.month
        const year=req.query.year
    
       await SalaryDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year},} },
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
        const year=req.query.year
    
       await SalaryDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year }} },
        {$group: {_id:"$person",amount:{"$sum":"$pending"}} }
    ])
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
    }
    module.exports.salaryGeneralReport=async(req,res)=>{
      
        const month=req.query.month
        const year=req.query.year
    
    
    await SalaryDeposite.find({date: { $regex: month+'-'+year }})
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
    
        await SalaryDeposite.aggregate([{ $match: {date: { $regex: month+'-'+year },} },
            {$group: {_id:"$username",amount:{"$sum":"$pending"}} }
        ])
            .then((data)=>{
               
                return res.send(data)})
            .catch( (err)=>{
                return res.status(200).json({success:true, token:'Error Loading Data'})
            })
    } 