const mongoose = require("mongoose");


const childrenSchema = mongoose.Schema({
    name: String,
    fathername: String,
    classname: String,
    image: String,
    rollno: Number,
    phonenumber: String,
    date: String,
    announce: String,
    status: {
        type: String, default: "1"

    },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },


}, { timestamps: true })

// create a new Collection using this model

const Children = mongoose.model('Children', childrenSchema);

module.exports = Children;
