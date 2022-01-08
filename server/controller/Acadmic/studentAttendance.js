const attendanceSchema=require('../../model/SD_model/attendanceSchema')
module.exports.markStudentAttendance=async(req,res)=>{
try {
   
    const date=req.body.date
    const section=req.body.section
    const presentStudents=req.body.presentUsers
    const absentStudents=req.body.absentUsers
   

    const newAttendance =await attendanceSchema.create({date,section,presentStudents,absentStudents})
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
module.exports.getStudentAttendance=async(req,res)=>{
    const date=req.query.date
    const section=req.query.section
    
    attendanceSchema.find({date:date,section:section},(error,data)=>{
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    })
}
module.exports.viewStudentAttendance=async(req,res)=>{
    const month=req.query.month
    const year=req.query.year
    const section=req.query.section
    attendanceSchema.find({date:{ $regex: year+'-'+month+'-' },section:section},(error,data)=>{
        if (error) {
            
            throw error;
        } else {
            
            res.send(data);
            
        }
    })
}
module.exports.updateStudentAttendance=(req,res)=>
{
    
    attendanceSchema.updateOne({date: req.body.date,section:req.body.section}, {presentStudents:req.body.presentUsers,absentStudents:req.body.absentUsers}, {upsert: false}, function(err, data) {
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
module.exports.deleteStudentAttendanceRecord=async(req,res)=>{
    
    const month=req.query.month
    const year=req.query.year
    const section=req.query.section
    
   await attendanceSchema.deleteMany({date:{ $regex: year+'-'+month+'-' },section:section},(error, data) => {
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
