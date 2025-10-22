const User = require("../models/user.model");
const createToken = require("../Utils/token");

//Login user controller
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = await User.login(email, password);
        //create token
        const token = createToken(user._id);
        res.status(200).json({ user: { _id: user._id, name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//SignUp user controller
const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = await User.signup(name, email, password);
        //create token
        const token = createToken(user._id);
        res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    userLogin,
    userSignup,
} 