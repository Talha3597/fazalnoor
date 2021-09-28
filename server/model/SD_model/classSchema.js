const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String,  },
        incharge: { type: String, }
    },
    {
        timestamps: true
    }
)

const classData = mongoose.model('classData', classSchema)
module.exports = classData