//requiring everything from npm 
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require('./config/db');
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("passport")
const postRouter = require("./routes/posts_routes")
const authRouter = require("./routes/auth_routes")

//define port heroku assigns value for PORT (capitals) - if not deployed it will run on port 3006
const port = process.env.PORT || 3006

const app = express()

//Connect the database 
connectDB();
console.log(process.env.NODE_ENV);
console.log(process.env.MONGODB_URI);

//initializes cors and bodyParser middleware 
app.use(cors())
app.use(bodyParser.json())

//middleware - server is going to handle sessions. Secret is used to encrypt the password and max age defines the session length
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })

}))

// Requiring passport from config and initializing passport and session 
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())

// Connects the session to the route
app.get("/",(req,res)=> {
    console.log(req.session)
    res.send(req.session)
})

//Routes
app.use("/posts", postRouter)
app.use("/auth", authRouter)

//server listens for port and confirms which port it is running on
app.listen(port, ()=> {
    console.log(`Naruto running on port ${port}`)
})