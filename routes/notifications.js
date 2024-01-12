
const router = require("express").Router();
const Notification = require("../models/notification");
const notifi = require("../notifications/notification")
// const router = express.Router();



router.post('/create', async (req, res) => {
    // console.log(req.body);
    let b = req.body;
    let data = await new Notification(b).save();
    res.json({ status: 1, data });
    notifi(b["title"], b["body"], b["date"], "Parent")
    console.log(b)
});

router.delete('/delete/:_id', async (req, res) => {
    await Notification.updateOne({ _id: req.params._id }, { status: "-1" })
    res.json({ status: 1, message: "Deleted" });
});

router.get('/all', async (req, res) => {
    let data = await Notification.find();
    res.json({ status: 1, data });
});

router.get('/getAllnotificationOnparentSidefromSchool/:id', async (req, res) => {
    let data = await Notification.find({ parentId: req.params.id, status: "1" })
    res.json({ status: 1, data, });

});

// router.get('/getAllnotificationOnschoolSidefromParent/:id', async (req, res) => {
//     let data = await Notification.find({ schoolId: req.params.id, status: "1" })
//     res.json({ status: 1, data, });

// });

module.exports = router;