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

//this is a helper function
const authenticate = passport.authenticate('local');

function loginUser(req, res) {
    console.log("in loginuser with req", req.body)
    authenticate(req, res, function () {
        console.log('authenticated', req.user.username);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.status(200);
        res.json({user: req.user, sessionID: req.sessionID});
    });
}

const logout = function(req, res) {
    req.logout()
    console.log("logged out user")
    console.log("session: ", req.session)
    console.log("user:", req.user)
    res.sendStatus(200)
}

module.exports = {register, loginUser, logout}