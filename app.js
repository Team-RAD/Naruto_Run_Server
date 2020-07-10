const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const port = process.env.port || 3000

const app = express()

app.use(cors())
app.use(bodyParser)

app.listen(port, ()=> console.log("Naruto running on port " + port))