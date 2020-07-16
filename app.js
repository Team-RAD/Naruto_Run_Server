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

//define port - if not deployed it will run on port 3006
const port = process.env.port || 3006

const app = express()

//Connect the database 
connectDB();
console.log(process.env.NODE_ENV);
console.log(process.env.MONGODB_URI);

app.use(cors())
app.use(bodyParser.json())

//creates database connection
// const dbConn = "mongodb://localhost/naruto_run"

//uses mongoose to connect to database - confirms by console logging "connected to naruto run database"
// mongoose.connect(
//     dbConn,
//     {
//       useNewUrlParser : true,
//       useUnifiedTopology : true,
//       useFindAndModify : false,
//       useCreateIndex: true  
//     },
//     err => {
//         if (err){
//             console.log("error connecting database", err)
//         } else {
//             console.log("Connected to naruto run database!!")
//         }
//     }
// )

//middleware - server is going to handle sessions
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

require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())


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