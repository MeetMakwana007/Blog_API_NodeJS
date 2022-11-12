const router = require('express').Router();
const Topic = require('../model/Topic')
const verify = require('../Auth/verifyLogin')
const validate = require('../validation/validation')

// Create New Topic

router.post("/topic", verify, async (req, res) => {

    //Check All Field value
    if (req.body.name == undefined) return res.send({ error: "Topic name required!!!" })

    //Check Length
    if (validate.lengthCheck(req.body.name, 3)) return res.status(400).send({ error: 'topic name length min 3 required!!!' })

    //check unique topic
    const result = await Topic.findOne({ name: req.body.name })
    if (result) return res.send({ error: "Topic Name Alredy Exits!!!" })

    const topic = new Topic({
        name: req.body.name,
        createdBy: req.user._id
    })

    try {
        await topic.save()
        res.status(201).send({ msg: "Topic Created Successfully!!!", topic })
    } catch (error) {
        res.status(400).send({ error })
    }
})

//Get All topic
router.get("/topic/", async (req, res) => {
    Topic.find({}, (err, result) => {
        if (err) return res.status(400).send({ error: err })
        res.status(200).send({ topics: result })
    })
})

module.exports = router