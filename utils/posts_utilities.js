const NarutoPost = require("../models/post") 

// requests and returns all of the posts 
const getAllPosts = function(req) {
    return NarutoPost.find()
}

// requests individual posts by id, returns if exists, if not returns error 
const getPostById = function(id) {
    let post = NarutoPost[req.params.id]
    if (post) return post
    else req.error = "Post not found"
}

//creates the add post constant using try catch
const addPost = function(body) {
    return new NarutoPost(body)
    }


//deletes a post by its id
const deletePost = function(id) {
    return NarutoPost.findByIdAndRemove(id)
}

//updates a post based on its id
const updatePost = function(req) {
    return NarutoPost.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    })

}


//exporting the above functions for use elsewhere in the app
module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost,
}