//destructuring getAllPosts and getPostByID for use in the posts_controller
const { getAllPosts, getPostById, addPost } = require("../utils/utilities")

//creates object getPosts with function taking in requests and responds by sending getAllPosts
const getPosts = function(req, res) {
    res.send(getAllPosts(req))
}
//creates object getPost 
const getPost = function(req, res) {
    let post = getPostById(req)
    //if post exists it sends the post
    if (post) res.send(post)
    //if it cant find a post it gives a 404 and sends error
    else {
            res.status(404)
            res.send(req.error)
    }
}

const makePost = function(req, res) {
    let post = addPost(req)
    if (post) {
        res.status(201)
        res.send(post)
    } else {
        res.status(500)
        res.send(`Error occured: ${req.error}`)
    }
}


//exports both variables for use elsewhere
module.exports = {
    getPosts,
    getPost,
    makePost
}