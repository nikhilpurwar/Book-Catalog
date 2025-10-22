const express = require("express");
const router = express.Router();
const {userLogin, userSignup} = require("../controllers/user.controller")
//login user
router.post("/login", userLogin);

//signup user
router.post("/register", userSignup);

module.exports = router;