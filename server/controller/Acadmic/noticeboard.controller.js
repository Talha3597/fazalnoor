const NoticeBoard =require('../../model/noticeboardSchema');



module.exports.addNotice=async (req,res)=>{
    
        
       
try{ 

       
       
        
           
           const notice=req.body.notice
           const url=req.body.url
           const Class=req.body.Class
           const section=req.body.section
           const status=req.body.status
           const attachment=req.body.attachment
           const date=req.body.date
           const title=req.body.title
           
           const newNotice=  NoticeBoard.create({title,notice,url,Class,section,status,attachment,date})
           
            
           return res.status(200).json({
                success: true,
                token: "Notice add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getNotice = async(req,res)=>
{        
       const {id}=req.query
       
       NoticeBoard.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.notices = async(req,res)=>
{        
       
       await NoticeBoard.find({}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
       
}
module.exports.deleteNotice=(req,res)=>{
    
    const id=req.query.id
    
    NoticeBoard.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}

module.exports.updateNotice=(req,res)=>
{
    
    NoticeBoard.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify noticeboard info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
