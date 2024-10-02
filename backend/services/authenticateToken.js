require('dotenv').config();
const jwt = require('jsonwebtoken');
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = { authenticateToken };