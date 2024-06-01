const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");


async function login(req, res) {
    try {
        const { email,password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }
        const token = generateToken(user);

        res.status(200).json({user: user ,token : token, isauthenticated: isPasswordValid});
    }
    catch (error) {
        res.status(401).json({message: error.message});
    }
}


module.exports = { login };