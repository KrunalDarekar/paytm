const express = require("express")
const { authMiddleware } = require("./middleware")
const { Account } = require("../db")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/balance", authMiddleware, async(req, res) => {
    const account = await Account.findOne({ userId: req.userId})
    if(account) {
        return res.status(200).json({
            balance: account.balance
        })
    } else {
        res.status(411).json({
            message: "Account not found"
        })
    }
})

router.post("/transfer", authMiddleware, async(req,res) => {
    try {
        const session = await mongoose.startSession()

        session.startTransaction()
        const {amount, to} = req.body

        const account = await Account.findOne({ userId: req.userId})
        const receiver = await Account.findOne({ userId: to})

        if( !account || !receiver) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        if( account.balance < amount) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        await Account.updateOne({ userId: req.userId}, { $inc : { balance: -amount}}).session(session)
        await Account.updateOne({ userId: to}, { $inc: { balance : amount}}).session(session)

        await session.commitTransaction()
        res.status(200).json({
            message: "Transaction successfull"
        })

    } catch {
        return res.status(400).json({
            message: "Transaction failed"
        })
    }
})

module.exports = router