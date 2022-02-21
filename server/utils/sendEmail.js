const nodemailer =require('nodemailer')
const Email =require('../model/emailSchema');

const sendEmail=(options)=>{
    const data= Email.find({})
    
    const transporter = nodemailer.createTransport({
        service:data[0].service,
        auth:{
            user:data[0].username,
            pass:data[0].hashString,
        }
    })

    const mailOptions = {
        from:data[0].username,
        to:options.to,
        cc:options.cc,
        bcc:options.bcc,
        subject:options.subject,
        html:options.text,
       
    }
     transporter.sendMail(mailOptions,function (err,info)
     {
         if (err) {
             console.log(err)
             
         } else {
             console.log(info)
         }
     })

}
module.exports= sendEmail