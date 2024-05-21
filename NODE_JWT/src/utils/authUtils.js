const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");
const { createPrivateKey } = require("crypto");


function generateToken(user) {

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, secretKey ,  { expiresIn: "1h" });

};

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload,secretKey , { expiresIn: "7h" });

};

function verifyToken(token) {

    return jwt.verify(token,secretKey);
}


module.exports = { generateToken, generateRefreshToken, verifyToken };