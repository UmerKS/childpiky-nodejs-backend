const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
require("./db/conn");
const port = process.env.PORT || 3005;

app.use(express.json({ limit: '50mb' }));
app.use(morgan("dev"))


// getting files
app.use("/uploads", express.static("uploads"));
// uploads files
app.use("/file", require("./routes/uploads"));



//Connection 
app.use("/school", require("./routes/schools"));
app.use("/parent", require("./routes/parents"));
app.use("/children", require("./routes/childens"));
app.use("/notification", require("./routes/notifications"));
app.use("/announcement", require("./routes/announcements"));






app.listen(port, () => {
    console.log(`Connection is setup qt ${port}`)
})