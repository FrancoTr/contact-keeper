const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) { //a middleware function needs a "next" function that indicates when to move to another piece of data
    // Get token from header
    const token = req.header('x-auth-token') //key to the token inside the header

    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))  //decoded has the entire token payload (check jwt documentation)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid'})
    }
}