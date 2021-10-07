const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },
   
    presentUsers: [{
        employeeNo: { type: Number, required: true },
        username: { type: String, required: true }
    }],

    absentUsers: [{
        employeeNo: { type: Number, required: true },
        username: { type: String, required: true }
    }]
    
    },
    {
        timestamps: true
    }
)

const UserAttendance = mongoose.model('UserAttendance', attendanceSchema)
module.exports = UserAttendance