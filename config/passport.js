const passport = require("passport");
const User = require("../models/user");
//set up passport-local strategy with correct options - this is for authenticating with a username and password
passport.use(User.createStrategy());
//middleware generates a function that serializes users into sessions
passport.serializeUser(User.serializeUser());
//middleware generates a function that deserializes users into sessions
passport.deserializeUser(User.deserializeUser());