// importing mongoose
const mongoose = require("mongoose")
// defining schema using mongoose 
const Schema = mongoose.Schema
// importing passportLocalMongoose 
const passportLocalMongoose = require("passport-local-mongoose")

// creating a new schema for user
const User = new Schema({
    // only need to define email in schema because username and password and baked into passport
    email: {
        type: String,
        required: true
    }
})

//allows strategy, serializeuser and deserialize user to work
User.plugin(passportLocalMongoose)

// exporting user for use elsewhere
module.exports = mongoose.model("User", User)