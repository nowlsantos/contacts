require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-authz-token');
    if ( !token ) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        req.contact = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;