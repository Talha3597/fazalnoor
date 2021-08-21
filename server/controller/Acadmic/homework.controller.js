const HomeWork =require('../../model/homeworkSchema');



module.exports.addHomework=async (req,res)=>{
    
        
       
try{ 

       
       
        
           
           const notice=req.body.notice
           const url=req.body.url
           const Class=req.body.Class
           const section=req.body.section
           const status=req.body.status
           const attachment=req.body.attachment
           const date=req.body.date
           const title=req.body.title
           
           const newNotice=  HomeWork.create({title,notice,url,Class,section,status,attachment,date})
           
            
           return res.status(200).json({
                success: true,
                token: "HomeWork add successfully",
            })
        
   }
    catch(error){
        return res.status(200).json({success:true, token:'Invalid Information'})
    
    }   
       
    
    
}
module.exports.getHomework = async(req,res)=>
{        
       const {id}=req.query
       
       HomeWork.findById(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
        }
    });
    
}
module.exports.homeworks = async(req,res)=>
{        
    const {Class,section}=req.query
    if(Class==''&& section==''){
       await HomeWork.find({}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
    else 
    {
        await HomeWork.find({Class:Class,section:section}).sort({_id:-1})
        .then((data)=>{
            
            return res.send(data)})
        .catch( (err)=>{
            return res.status(200).json({success:true, token:'Error Loading Data'})
        })
    } 
}
module.exports.deleteHomework=(req,res)=>{
    
    const id=req.query.id
    
    HomeWork.findByIdAndDelete(id, (error, data) => {
        if (error) {
            
            throw error;
        } else {
            
            res.status(204).json(data);
        }
    });
}

module.exports.updateHomework=(req,res)=>
{
    
    HomeWork.updateOne({_id: req.body.id}, {$set:req.body}, {upsert: true}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify noticeboard info..."});
        } else {           
           //console.log(hasps);
           
           res.status(200).send(data);
        }
    }); 
}
