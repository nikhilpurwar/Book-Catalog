const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authUser = async (req, res, next) => {
    // standard header is 'authorization' but older code may have the typo 'authrization'
    const authorization = req.headers.authorization || req.headers.authrization;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ error: "Invalid authorization header format" });
    }

    const token = parts[1];
    try {
        const SECRET = process.env.JWT_SECRET || 'dev_secret';
        if (!process.env.JWT_SECRET) {
            console.warn('JWT_SECRET is not set — using fallback dev secret. Set JWT_SECRET in production.');
        }
        const { _id } = jwt.verify(token, SECRET);
        req.user = await User.findById(_id).select("_id");
        next();
    } catch (err) {
        res.status(401).json({ error: "You must be logged in" });
    }
}

// optionalAuth: if a valid token is provided, attach req.user; otherwise continue without error
const optionalAuth = async (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.authrization;
    if (!authorization) return next();

    const parts = authorization.split(" ");
    if (parts.length !== 2) return next();

    const token = parts[1];
    try {
        const SECRET = process.env.JWT_SECRET || 'dev_secret';
        const { _id } = jwt.verify(token, SECRET);
        req.user = await User.findById(_id).select("_id");
    } catch (err) {
        // ignore token errors for optional auth
    }
    return next();
}

module.exports = {
    authUser,
    optionalAuth
}
