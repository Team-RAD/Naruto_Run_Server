// importing express
const express = require("express")
// defining the router using express
const router = express.Router()
// pulling in register, loginUser, logout from auth_controller
const {register, loginUser, logout} = require("../controllers/auth_controller")

// defines the routes for register, loginUser and logout
router.post("/register", register)
router.post("/login", loginUser)
router.get("/logout", logout)

// exporting the router for use elsewhere
module.exports = router