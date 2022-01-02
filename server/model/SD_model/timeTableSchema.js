const mongoose = require('mongoose')

const timetableSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        day: { type: String, required: true },
        teacherName: { type: String, required: true },
        section: { type: String, required: true },
        lecStart: { type: String, required: true },
        lecEnd: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const timetable = mongoose.model('timetable', timetableSchema)
module.exports = timetable