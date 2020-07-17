const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
        type: Number,
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

module.exports = mongoose.model("NarutoPost", NarutoPost)