const { application } = require("express");

const express = require("express");
const Children = require("../models/children");
const School = require("../models/school");
const router = express.Router();


//create children
router.post('/create', async (req, res) => {
    let data = await new Children(req.body).save();
    res.json({ status: 1, data });
});

//update children
router.post('/update', async (req, res) => {
    console.log(req.body);
    let data = await Children.findByIdAndUpdate(req.body._id, req.body, { new: true })
    console.log(data, "===========53")
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
});



// Delete One
router.delete('/delete/:_id', async (req, res) => {
    await Children.updateOne({ _id: req.params._id }, { status: "-1" })
    res.json({ status: 1, message: "Deleted" });
});

//get all children

router.get('/schoolwithchildren/:id', async (req, res) => {
    let data = await Children.find({ schoolId: req.params.id, status: "1" }).populate("schoolId")
    res.json({ status: 1, data, });
});


router.get('/childrenwithparent/:id', async (req, res) => {
    let data = await Children.find({ parentId: req.params.id }).populate("schoolId")
    res.json({ status: 1, data });
});

router.get('/allchildenwithschool/:id', async (req, res) => {
    let data = await Children.find({ schoolId: req.params.id }).populate("schoolId")
    res.json({ status: 1, data });
});

module.exports = router;