const passport = require("passport")
// pulling user from the models
const User = require("../models/user")

// register takes in username email and password, creates a new instance
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


// utilizes passport authenticate to log in previously registered user 
const loginUser = function(req, res) {
    passport.authenticate("local")(req, res, function () {
        console.log("authenticated", req.user.username)
        console.log("session: ", req.session)
        console.log("user:", req.user)
        res.json(req.user)
    })
}

//do we change to this one?
// function loginUser(req, res) {
//     authenticate(req, res, function () {
//     res.status(200);
//     res.json({user: req.user, sessionID: req.sessionID});
//     });
//     }

// logging out user
const logout = function(req, res) {
    req.logout()
    console.log("logged out user")
    console.log("session: ", req.session)
    console.log("user:", req.user)
    res.sendStatus(200)
}

// exporting register, loginUser, logout for use elsewhere
module.exports = {register, loginUser, logout}