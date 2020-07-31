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
                if(err.name === 'UserExistsError') {
                res.status(409)
                res.json({
                error: err.message
                });
                } else {
                res.status(500);
                res.json({
                error: err
                });
                }
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

//logs out user
const logout = function(req, res) {
    req.logout()
    console.log("logged out user")
    console.log("session: ", req.session)
    console.log("user:", req.user)
    res.sendStatus(200)
}

const authenticatedUser = function(req, res) {
    if (req.user) {
        res.status(200);
        res.send(req.user.username)
    } else {
        res.sendStatus(204)
    }
}

// exporting register, loginUser, logout for use elsewhere
module.exports = {register, loginUser, logout, authenticatedUser}