const SchoolInfo = require('../../model/schoolInfoSchema');
const schoolInfo =require('../../model/schoolInfoSchema');



module.exports.addSchoolInfo=async (req,res)=>{
    
        
       
try{ 
           const principalMessage=req.body.principalMessage
           const mission=req.body.mission
           const schoolName=req.body.schoolName
           const address=req.body.address
           const phoneNo=req.body.phoneNo
           const email=req.body.email
           const whatsapp=req.body.whatsapp
         
           const facebook=req.body.facebook
           const map=req.body.map
           
           const newNotice=  schoolInfo.create({principalMessage,mission,schoolName,address,email,phoneNo,whatsapp,facebook,map})
           return res.status(200).json({
                success: true,
                token: "schoolInfo add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getSchoolInfo = async(req,res)=>
{        
      
    await SchoolInfo.find({})
        .then((data)=>{
          
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    
}

module.exports.deleteSchoolInfo=(req,res)=>{
    
    const id=req.query.id
    
    schoolInfo.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}

module.exports.updateSchoolInfo=(req,res)=>
{
    
    schoolInfo.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify noticeboard info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
