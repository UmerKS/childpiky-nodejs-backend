const mongoose = require("mongoose");

const parentSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
    status: String,
    image: String,
    age: String,
    fcmTokens: [],

}, { timestamps: true })
// create a new Collection using this model
const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
