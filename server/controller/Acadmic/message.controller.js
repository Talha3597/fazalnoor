const Message =require('../../model/messageSchema');
const StudentSchema =require('../../model/studentSchema');


module.exports.addMessage=async (req,res)=>{     
try{  
           const to =req.body.to
           const role =req.body.role
           const Class =req.body.Class
           const section =req.body.section 
           const text=req.body.text
           const data=req.body.gdata
           const date=new Date()
           if(to!='')
           {
              
               const newMessage=  Message.create({to,text,date})
        
         
               return res.status(200).json({
                    success: true,
                    token: "Message sent",
                })
           }
          else if(Class!=''&& section!=''){
            const to=Class+' '+section
            await StudentSchema.find({Class:Class,section:section})
             .then((data)=>{
                 
               
            })
             .catch( (err)=>{
                 return res.status(200).json({success:true, token:'Error Loading Data'})
             })
             const newMessage=  Message.create({to,text,date})
        
         
             return res.status(200).json({
                  success: true,
                  token: "Message sent",
              })
            }
         else if(role=='Users'){
               
                const to=role
           
                
               const newMessage=  Message.create({to,text,date})
           
            
            return res.status(200).json({
                 success: true,
                 token: "Message sent",
             })
           }
           
           else if(role=='Students'){
               const to=role
            if(Class==''&& section==''){
                await StudentSchema.find({})
                 .then((data)=>{
                     
                  
                })
                 .catch( (err)=>{
                     return res.status(200).json({success:true, token:'Error Loading Data'})
                 })
                }
        
            const newMessage=  Message.create({to,text,date})
        
         
         return res.status(200).json({
              success: true,
              token: "Message sent",
          })
        }

          
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Message not sent'})
    
    }   
       
    
    
}

module.exports.messages = async(req,res)=>
{    
   
       await Message.find({}).sort({_id:-1}).limit(200)
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       
}
module.exports.deleteMessage=(req,res)=>{
    
    const id=req.query.id
    
    Message.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}

