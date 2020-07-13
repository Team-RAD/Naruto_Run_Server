//destructuring for use in the posts_controller
const { getAllPosts, getPostById, addPost, deletePost, updatePost } = require("../utils/posts_utilities")

//creates object getPosts with function taking in requests and responds by sending getAllPosts
const getPosts = function(req, res) {
//executes promise using the getAllPosts function 
    getAllPosts(req).exec((err, posts) => {
//if there is an error it will return the error message         
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
//if there is no error it will send back the result (list of posts)       
        res.send(posts)
    })
}
//creates object getPost and will send back single post based on id.
const getPost = function(req, res) {
    getPostById(req.params.id).exec((err, post) => {
        if (err){
            res.status(404)
            return res.send("Naruto Post not found")
        }
        res.send(post)
    })
}

//creates a new post using the addPost funciton as a promise
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

//removes post based on the id
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
//middleware - user must be authenticated to post, update and delete
const userAuthenticated = function(req, res, next){
//if door is open
    if (req.isAuthenticated()){
        next()
    }else{
//if door is closed - you are not allowed
        res.sendStatus(403)
    }
}

//exports variables for use elsewhere
module.exports = {
    getPosts,
    getPost,
    makePost,
    removePost,
    changePost,
    userAuthenticated
}