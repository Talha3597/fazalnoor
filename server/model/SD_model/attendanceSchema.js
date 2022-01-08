const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    section: { type: String, required: true },
    presentStudents: [Number],
    absentStudents:  [Number]
    },
   
)

const attendance = mongoose.model('attendance', attendanceSchema)
module.exports = attendance