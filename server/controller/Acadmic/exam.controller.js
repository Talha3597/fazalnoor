const Exam =require('../../model/examSchema');
const gradeSchema = require('../../model/SD_model/gradeSchema')



module.exports.addExam=async (req,res)=>{
    
        
       
try{ 
           const Class=req.body.Class
           const section=req.body.section
           const title=req.body.title
           
           const newNotice=  Exam.create({title,Class,section})
           
            
           return res.status(200).json({
                success: true,
                token: "Exam add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getExam = async(req,res)=>
{        
       const {id}=req.query
       
       Exam.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.exams = async(req,res)=>
{        
    const {Class,section}=req.query
    if(Class==''&& section==''){
       await Exam.find({}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
    else if(Class!=''&& section=='') 
    {
        await Exam.find({Class:Class}).sort({_id:-1})
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
    else if(Class=='' && section !='') 
    {
        await Exam.find({section:section}).sort({_id:-1})
        .then((data)=>{
           
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
    else 
    {
        await Exam.find({Class:Class,section:section}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
}
module.exports.deleteExam=(req,res)=>{
    
    const id=req.query.id
    
    Exam.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
             gradeSchema.deleteMany({section:data.section,stdclass:data.Class,title:data.title},(error, data) => {
                if (error) {
                    
                    throw error;
                } else {
                    
                    res.status(204).json(data);
                    
                }
            });
        }
    });
}
