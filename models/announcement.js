const mongoose = require("mongoose");


const announcementSchema = mongoose.Schema({


    status: String,
    childrenId: { type: mongoose.Schema.Types.ObjectId, ref: "Children" },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },

}, { timestamps: true })

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
