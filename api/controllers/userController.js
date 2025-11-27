const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const createNewAccount = async(req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);

        await User.create({
            username: req.body.username,
            password: hashed
        });

        res.json({ message: "User registered" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginAccount = async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(400).json({ error: "User not found" });

        const ok = await bcrypt.compare(req.body.password, user.password);
        if (!ok) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            "SECRET_KEY",
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createNewAccount,
    loginAccount
};
