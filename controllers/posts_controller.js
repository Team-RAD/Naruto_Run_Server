//destructuring for use in the posts_controller
const { getAllPosts, getPostById, addPost, deletePost, updatePost } = require("../utils/posts_utilities")

//creates object getPosts with function taking in requests and responds by sending getAllPosts
const getPosts = function(req, res) {
    getAllPosts(req).exec((err, posts) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.send(posts)
    })
}
//creates object getPost 
const getPost = function(req, res) {
    getPostById(req.params.id).exec((err, post) => {
        if (err){
            res.status(404)
            return res.send("Naruto Post not found")
        }
        res.send(post)
    })
}

const makePost = function(req, res) {
    addPost(req.body).save((err,post) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(post)
    })
}

const removePost = function(req, res) {
    deletePost(req.params.id).exec((err) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const changePost = function(req, res) {
    updatePost(req).exec((err,post) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(200)
        res.send(post)
    })
}

//exports variables for use elsewhere
module.exports = {
    getPosts,
    getPost,
    makePost,
    removePost,
    changePost
}