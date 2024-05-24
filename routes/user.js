const express = require("express");
const router = express.Router();
const {login,register, followUser } = require("../controll/user")
const authMiddleware = require("../middleware/auth")
router.route("/register").post(register)
router.route("/login").post(login)
// router.route("/follow/:id").get(authMiddleware , followUser)


module.exports = router;
