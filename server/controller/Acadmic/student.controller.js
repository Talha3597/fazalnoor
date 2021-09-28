const StudentSchema =require('../../model/studentSchema');

const Fee =require('../../model/feeSchema');



module.exports.addStudent=async (req,res)=>{
    
        
       
try{ 
           const studentName=req.body.name
           
           const Class=req.body.Class
           const section=req.body.section
           const address=req.body.address
           const dob=req.body.dob
           const cnic=req.body.cnic
           const parentName=req.body.parentName
           const phoneNo=req.body.phoneNo
           const parentRelation=req.body.parentRelation
           const email=req.body.email
           const description=req.body.description
           const fee=req.body.schoolFee
           const amount=req.body.admissionFee
           const person=req.body.createdBy
           
           const newStudent= await StudentSchema.create({studentName,Class,section,dob,address,parentName,cnic,phoneNo,parentRelation,email,description,fee})
           StudentSchema.find({studentName:studentName,Class:Class,section:section,address:address,}, (error, data) => {
            if (error) {
                
                throw error;
            } else {
           const title="Admission Fee"
           const date= new Date
           let studentNo=data.studentNo
           console.log(data)

           let status="Unpaid"
           let type='fee'
          const discount=0
          const pending=0 
           const newFee=  Fee.create({title,type,studentName,studentNo,amount,discount,pending,date,status,Class,section,person})
                              
           return res.status(200).json({
                success: true,
                token: "Student add successfully",
            })
        
                
            }
        })
           
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
}
module.exports.getStudent = async(req,res)=>
{        
       const {id}=req.query
       
      await StudentSchema.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.findStudent = async(req,res)=>
{        if(req.query.id!=''){
       const {studentNo}=req.query
       
      await StudentSchema.find({studentNo:studentNo}, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    });
}
}

module.exports.students = async(req,res)=>
{        
       const search=req.query.search
       const Class=req.query.Class
       const section=req.query.section
       const studentNo=req.query.studentNo 
        if(studentNo!=''){
        await StudentSchema.find({studentNo:studentNo}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
        
       }else if(Class!='' && section!=''){
        await StudentSchema.find({Class:Class,section:section}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
         
       }
       else if(Class!='' && section==''){
        await StudentSchema.find({Class:Class}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
         
       } else if(search==''){
        await StudentSchema.find({}).sort({_id:-1}).limit(200)
         .then((data)=>{
             
             return res.send(data)})
         .catch( (err)=>{
             return res.status(200).json({success:true, token:'Error Loading Data'})
         })
        }
       else{
       await StudentSchema.find({studentName: { $regex: search,'$options' : 'i' }}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    }
}
module.exports.studentsData = async(req,res)=>
{        
       const Class =req.query.Class
       const section=req.query.section
       if(Class!=''&& section!=''){
       await StudentSchema.find({Class:Class,section:section})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       }}
module.exports.deleteStudent=async(req,res)=>{
    
    const id=req.query.id
  
    await StudentSchema.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
            
        }
    });
}

module.exports.updateStudent=(req,res)=>
{
    
    StudentSchema.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify student info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
module.exports.promote=(req,res)=>
{
    const tClass=req.body.tClass
    const tSection=req.body.tSection
    const fClass=req.body.fClass
    const fSection=req.body.fSection
   
    StudentSchema.updateMany({'Class': fClass,'section':fSection }, { $set: {
        Class: tClass,section:tSection 
       }
    }, {upsert: false}, function(err) {
        if (err) {
            res.status(500).send({error: "Could not modify student info..."});
        } else {                 
                   res.status(200)
           
           
           
        }
    }); 
}
module.exports.transfer=(req,res)=>
{
    const Class=req.body.Class
    const section=req.body.section
    const studentNo=req.body.studentNo
    StudentSchema.updateOne({studentNo: studentNo}, {$set:{Class:Class,section:section}}, {upsert: false}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify student info..."});
        } else {           
               
                   res.status(200).send(data);
                
            
           
           
        }
    });
}

