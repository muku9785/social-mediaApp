const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Please login first' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        
        next();
    } catch (error) {
        console.error("Auth middleware error:", error); // Debugging log
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
