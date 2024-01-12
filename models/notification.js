const { Schema, model, ObjectId } = require("mongoose");

const schema = Schema({
    title: String,
    body: String,
    date: String,
    schoolId: { type: ObjectId, ref: "School" },
    parentId: { type: ObjectId, ref: "Parent" },
    status: { type: String, default: "1" },

}, { timestamps: true })
// create a new Collection using this model

module.exports = model('Notification', schema);

