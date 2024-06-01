const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res , next) {

    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized : Missing token"});

    }

    const [bearer,token] = authHeader.split(" ");
    if (bearer !== "Bearer" ||  !token) {
        return res.status(401).json({message: "unauthorized: Invalid token format"});

    }

    jwt.verify(token,"342342351345kjla3423546",(err,user) => {
        if (err)
            return res.status(403).json({ message: "Forbidden: Invalid token"});
        req.user = user;
        next();
    } )


}

module.exports = { authenticateToken };