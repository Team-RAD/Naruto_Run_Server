const express = require("express")
const router = express.Router()
const {register, loginUser, logout} = require("../controllers/auth_controller")

router.post("/register", register)
router.post("/login", loginUser)
router.get("/logout", logout)

module.exports = router