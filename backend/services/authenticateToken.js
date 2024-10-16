require('dotenv').config();
const jwt = require('jsonwebtoken');
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, no token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden, invalid token' });
        }
        req.user = user
        next()
    })
}


module.exports = { authenticateToken };