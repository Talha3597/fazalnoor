const sendEmail =require('../../utils/sendEmail')
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