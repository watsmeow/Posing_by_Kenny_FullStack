const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message : "User fields must contain data."})
            return
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error saving user information to the database has occured."
        })
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ 
            username: req.body.username
        });
        !user && res.status(401).json('Incorrect credentials')

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword != req.body.password && 
            res.status(401).json('Incorrect credentials')

            const accessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin,
                }, 
            process.env.JWT_SEC,
            {expiresIn: '3d'});
        
        const { password, ...others} = user._doc;

        res.status(201).json({...others, accessToken})
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error finding that user information has occured."
        })
    }
});

module.exports = router;