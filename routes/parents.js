const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = 3;
const Parent = require("../models/parent");

//create create
router.post('/create', async (req, res) => {
    let b = req.body;
    console.log("======1223")
    let parentdata = await Parent.findOne({ email: b.email });
    console.log(parentdata, "=======12")
    if (!parentdata) {
        b.password = await bcrypt.hash(b.password, salt);
        let data = await new Parent(req.body).save();
        res.json({ status: 1, data });
    } else {
        res.json({ status: 0, message: 'Email already exist' });
    }
});

//login parent
router.post('/login', async (req, res) => {
    try {
        let b = req.body;
        let data = await Parent.findOne({ email: req.body.email });
        console.log(data, "-------34");
        let hashps = await bcrypt.compare(b.password, data.password);
        console.log(data && hashps, "-------35");
        if (data && hashps) {
            data.password = undefined
            res.json({ status: 1, data });
            if (data.fcmTokens.indexOf(b.fcm) == -1)
                await Parent.updateOne({ _id: data._id }, { $push: { fcmTokens: b.fcm } });
        } else {
            res.json({ status: 0, message: 'Email not exist' });
        }
    } catch (err) {
        console.log('on Data');
    }
});

//update parent

router.post('/update', async (req, res) => {
    console.log(req.body);
    let data = await Parent.findByIdAndUpdate(req.body._id, req.body, { new: true })
    console.log(data, "===========53")
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
});

//get all Parent
router.get('/all', async (req, res) => {
    let data = await Parent.find();
    res.json({ status: 1, data });
});

//get one parent
router.get('/one/:id', async (req, res) => {
    let data = await Parent.findOne({ _id: req.params.id });
    res.json({ status: 1, data });
});

// delete 
router.delete("/detele/:id", async (req, res) => {
    let data = await Parent.findByIdAndDelete();
    res.json({ status: 1, data });
});

module.exports = router;