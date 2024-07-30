//this is the authorization middleware for the user( manager)
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const jwtSecret = process.env.JWT_SECRET;

const authorizeManager = function (req, res, next) {
    // Extract token from the 'x-auth-token' header
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, jwtSecret);
        
        // Attach the decoded manager data to req.manager
        req.manager = decoded.manager; // Ensure your token payload contains 'manager'
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authorizeManager;
