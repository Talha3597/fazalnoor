const UserAttendance=require('../../model/attendanceSchemaUser')
module.exports.markAttendance=async(req,res)=>{
try {
    const date=req.body.date
    const presentUsers=req.body.presentUsers
    const absentUsers=req.body.absentUsers
   
    const newAttendance =await UserAttendance.create({date,presentUsers,absentUsers})
    return res.status(200).json({
        success: true,
        token: "Attendance mark successfully",
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        token: "Attendance not marked ",
    })
}
}
module.exports.getAttendance=async(req,res)=>{
    const date=req.query.date
    UserAttendance.find({date:date},(error,data)=>{
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    })
}
module.exports.viewAttendance=async(req,res)=>{
    const month=req.query.month
    const year=req.query.year
    UserAttendance.find({date:{ $regex: year+'-'+month+'-' }},(error,data)=>{
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    })
}
module.exports.updateAttendance=(req,res)=>
{
    
    UserAttendance.updateOne({date: req.body.date}, {presentUsers:req.body.presentUsers,absentUsers:req.body.absentUsers}, {upsert: false}, function(err, data) {
        if (err) {
            res.status(500).send({error: "Could not modify attendance info..."});
        } else {           
            return res.status(200).json({
                success: true,
                token: "Attendance Updated successfully",
            })
        }
    }); 
}
module.exports.deleteAttendanceRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    
   await UserAttendance.deleteMany({date:{ $regex: year+'-'+month+'-' }},(error, data) => {
        if (error) {
            
            throw error;
        } else {
            return res.status(200).json({
                success: true,
                token: "Attendance Record Deleted successfully",
            })
        }
    });
}
