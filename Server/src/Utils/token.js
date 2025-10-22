const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const SECRET = process.env.JWT_SECRET || 'dev_secret';
    if (!process.env.JWT_SECRET) {
        console.warn('JWT_SECRET is not set — using fallback dev secret. Set JWT_SECRET in production.');
    }
    return jwt.sign({ _id }, SECRET, {
        expiresIn: "1d",
    });
}

module.exports = createToken