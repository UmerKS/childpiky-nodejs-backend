const FCM = require("fcm-node");
const Notification = require("../models/notification");
const School = require("../models/school");
const Parent = require("../models/parent");
const serverKeyS = process.env.SERVER_KEY_SCHOOL;
const serverKeyP = process.env.SERVER_KEY_PARENT
const fcmSchool = new FCM(serverKeyS);
const fcmParent = new FCM(serverKeyP);

module.exports = async function (title = "", body = "", type = "School", _id) {
    let notification;
    console.log("Notifitcation Send====================12");
    let fcms = [];
    if (type == "School") {
        notification = await new Notification({ title, body, schoolId: _id }).save();
        //  console.log(notification, "=--=-=-=-=-=-==-=-=-=-=-=-=-=-==-=--=-=-=")
        let user = await School.findOne({ _id, status: { $nin: "-1" } }, { fcmTokens: 1, });
        fcms = user.fcmTokens;

    }
    else {
        let data = await Parent.find({ status: "1" }, { fcmTokens: 1, });
        //  console.log(data, "1111111")
        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i].fcmTokens, "===========23")
            fcms = [...fcms, ...data[i].fcmTokens];

            notification = await new Notification({ title, body, parentId: data[i]._id }).save();
        }
    }
    //    console.log(fcms, "============27");


    for (let i = 0; i < fcms.length; i++) {
        if (type == "School")
            fcmSchool.send({
                to: fcms[i],
                notification: { title: title, body, }
            }, function (err, response) { });
        else
            fcmParent.send({
                to: fcms[i],
                notification: { title: title, body, }
            }, function (err, response) { });
    }

}


