const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const postRouter = require("./routes/posts_routes")

const port = 3006

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/posts", postRouter)

app.listen(port, ()=> {
    console.log(`Naruto running on port ${port}`)
})