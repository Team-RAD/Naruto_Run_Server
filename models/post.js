// importing mongose
const mongoose = require("mongoose")
// defining a schema using mongoose
const Schema = mongoose.Schema

// defining the post schema "NarutoPost"
const NarutoPost = new Schema ({
    username: {
        type: String,
        required: true
    },        
    pre_tech_job: {
        type: String,
        required: true
    },
    current_tech_job: {
        type: String,
        required: true
    },    
    education: {
        type: String,
        required: true
    },
    resources_required: {
        type: String,
        required: true
    },
    time_taken: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    journey: {
        type: String,
        required: true
    },
    tech_stack: {
        type: String,
        required: true
    },
    os_allegiance: {
        type: String,
    },
    fueled_by: {
        type: String,
    },
    favourite_coding_playlist: {
        type: String,
    },
    follow_me_links: {
        type: String,
    },

})

NarutoPost.statics.findByUsername = function (username) {
    return this.find({
        username: username
    });
};

// exporting "NarutoPost"
module.exports = mongoose.model("NarutoPost", NarutoPost)