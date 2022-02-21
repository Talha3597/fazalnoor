const sendEmail =require('../../utils/sendEmail')
const Email =require('../../model/emailSchema');

module.exports.sendEmail=async(req,res)=>
{
    const {to,cc,bcc,subject,text}=req.body
    await sendEmail({
        to:to,
        cc:cc,
        bcc:bcc,
        subject:subject,
        text:text,
        
    }) 
    res.status(200).json({success:true, data:"Email Sent"})
}
module.exports.addEmail=async(req,res)=>{
try{
    const service=req.body.service
    const username=req.body.username
    const password=req.body.password
    const hashString=req.body.password
    const newNotice=  Email.create({service,username,password,hashString})
    
     
    return res.status(200).json({
         success: true,
         token: "Email add successfully",
     })
 
}
catch(error){
 return res.status(200).json({success:true, token:'Invalid Information'})

} 



}

module.exports.getEmail = async(req,res)=>
{        
    await Email.find({})
        .then((data)=>{
            let data1=data
            data1[0].password=''
            data1[0].hashString=''
            return res.send(data1)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
}
module.exports.deleteEmail=(req,res)=>{
    
    const id=req.query.id
    
    Email.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}
