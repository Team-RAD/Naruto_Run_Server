const passport = require("passport")
const User = require("../models/user")

const register = function(req, res){
    User.register(new User ({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err){
        if(err){
            res.status(500)
            res.json({
                error: err
            })
        }else{
            //log in the user
            loginUser(req, res)
        }
    })
}



const loginUser = function(req, res) {
    passport.authenticate("local")(req, res, function () {
        console.log("authenticated", req.user.username)
        console.log("session: ", req.session)
        console.log("user:", req.user)
        res.json(req.user)
    })
}

const logout = function(req, res) {
    req.logout()
    console.log("logged out user")
    console.log("session: ", req.session)
    console.log("user:", req.user)
    res.sendStatus(200)
}

module.exports = {register, loginUser, logout}