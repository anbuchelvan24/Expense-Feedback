const express = require("express");
const { signupUser } = require("../controller/signup");


const router = express.Router();

router.post("/register",signupUser);

module.exports = router;
