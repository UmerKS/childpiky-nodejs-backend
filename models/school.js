const mongoose = require("mongoose");


const schoolSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
    adress: String,
    image: String,
    opentime: Number,
    closetime: Number,
    country: String,
    fcmTokens: Array,
    status: String,


}, { timestamps: true })

// create a new Collection using this model

const School = mongoose.model('School', schoolSchema);

module.exports = School;
