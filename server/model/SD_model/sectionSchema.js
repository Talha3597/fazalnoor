const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String,  },
        teacher: { type: String,  },
        class_id: { type: String, required: true },
        classTitle: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const section = mongoose.model('section', sectionSchema)
module.exports = section