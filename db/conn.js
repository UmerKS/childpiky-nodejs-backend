const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {

}).then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log(e, "No connection");
})