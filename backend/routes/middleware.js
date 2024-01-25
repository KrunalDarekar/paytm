const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({})
    }

    const tokenArr = req.headers.authorization.split(" ")
    const decoded = jwt.verify(tokenArr[1], JWT_SECRET)

    if (decoded) {
        req.userId = decoded.userId;
        next()
    } else {
        return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware,
}