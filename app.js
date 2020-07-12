const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const postRouter = require("./routes/posts_routes")

const port = process.env.port || 3006

const app = express()

app.use(cors())
app.use(bodyParser.json())

const dbConn = "mongodb://localhost/naruto_run"

//uses mongoose to connect to database - confirms by console logging "connected to naruto run database"
mongoose.connect(
    dbConn,
    {
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useFindAndModify : false  
    },
    err => {
        if (err){
            console.log("error connecting database", err)
        } else {
            console.log("Connected to naruto run database!!")
        }
    }
)

app.use("/posts", postRouter)

app.listen(port, ()=> {
    console.log(`Naruto running on port ${port}`)
})