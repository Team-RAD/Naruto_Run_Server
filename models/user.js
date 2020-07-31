const mongoose = require("mongoose")
// defining schema using mongoose 
const Schema = mongoose.Schema 
const passportLocalMongoose = require("passport-local-mongoose")

// creating a new schema for user
const User = new Schema({
    // only need to define email in schema because username and password are baked into passport
    email: {
        type: String,
        required: true
    }
})

//allows strategy, serialize user and deserialize user to work
User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)