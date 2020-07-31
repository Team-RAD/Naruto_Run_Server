const express = require("express")
// defining the router using express
const router = express.Router()
// pulling in register, loginUser, logout from auth_controller
const {register, loginUser, logout, authenticatedUser} = require("../controllers/auth_controller")

// defines the routes for register, login, User and logout
router.post("/register", register)
router.post("/login", loginUser)
router.get("/logout", logout)
router.get("/user", authenticatedUser)

module.exports = router