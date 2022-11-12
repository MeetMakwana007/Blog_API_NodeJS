const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('../validation/validation')


router.post('/register', async (req, res) => {

    //Check all value
    if (req.body.email == undefined || req.body.name == undefined || req.body.password == undefined)
        return res.send({ error: "All Filed is Required" })

    //Email Format Check
    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })

    //Password Length Check
    if (validate.lengthCheck(req.body.password, 6)) return res.status(400).send({ error: 'Password length min 6 required!!!' })

    //Name Length Check
    if (validate.lengthCheck(req.body.name, 3)) return res.status(400).send({ error: 'Name length min 3 required!!!' })

    //Unique Email check
    const emailCheck = await User.findOne({ email: req.body.email })
    if (emailCheck) return res.status(400).send({ error: 'Email id Already Exits!!!' })

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    });

    try {
        const savedUser = await user.save();
        res.status(201).send({ msg: "Registration Sucessfull", savedUser });

    } catch (error) {
        res.status(400).send({ Msg: "Registration Failed!!!", error })
    }

});

router.post('/login', async (req, res) => {

    //Check all value
    if (req.body.email == undefined || req.body.password == undefined)
        return res.send({ error: "All Fields are required" })

    //Email Format Check
    if (!validate.emailCheck(req.body.email)) return res.status(400).send({ error: "Enter Correct Email Address!!!" })

    //Check User Details
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send({ error: "Email Or Password not match!!!" })

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.send({ error: "Email Or Password not match!!!" })


    const token = jwt.sign({ _id: user._id }, 'ItIsSecret')

    //Set Auth token
    res.header('auth-token', token).send({ msg: "User Login Successfully!!", token })

});


module.exports = router;