// backend/routes/user.js
const express = require('express');
const { User, Account } = require('../db');
const zod = require("zod")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require('../config');
const { authMiddleware } = require('./middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})

const router = express.Router();

router.post("/signup", async(req,res) => {
    const {success } = signupBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "invalid input"
        })
    }

    const existingUser = await User.findOne({username: req.body.username});
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })
    await user.save()

    const userId = user._id;

    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10000) + 1
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/signin", async(req,res) => {
    const {success } = signinBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Error while loging in"
        })
    }

    const user = await User.findOne(req.body);
    if(user) {
        const token = jwt.sign({ userId: user._id}, JWT_SECRET)
        return res.status(200).json({
            token: token
        })
    } else {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleware, async(req,res) => {
    const filter = req.query.filter || ""

    const filteredUsers = await User.find({
        $or: [{
            firstName: {
                "$regex": filter , "$options" : 'i'
            }
        }, {
            lastName: {
                "$regex": filter , "$options" : 'i'
            }
        }]
    })

    const formattedUsers = filteredUsers.filter(user => user._id.toString() !== req.userId.toString())
    .map( user => {
            return { 
                firstName : user.firstName, 
                lastName : user.lastName,
                _id : user._id
            }
        }
    )

    res.json({
        users: formattedUsers
    })
})

module.exports = router;