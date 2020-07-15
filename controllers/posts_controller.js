//destructuring for use in the posts_controller
const { getAllPosts, getPostById, addPost, deletePost, updatePost } = require("../utils/posts_utilities")
const post = require("../models/post")

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
    getPostById(req).exec((err, post) => {
        if (err){
            res.status(404)
            return res.send("Naruto Post not found")
        }
        res.send(post)
    })
}

//creates a new post using the addPost funciton as a promise
const makePost = function(req, res) {
    //adds username
    req.body.username = req.user.username
    //saves the post instance
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
    //check for error from verifyOwner middleware
    if (req.error){
        res.status(req.error.status)
        res.send(req.error.messsage)
    }else{
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
}

const changePost = function(req, res) {
    //check for error from verifyOwner middleware
    if (req.error){
        res.status(req.error.status)
        res.send(req.error.message)
    }else{
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

//middleware - if user isn't post owner it sends forbidden

const verifyOwner = function(req, res, next){
    if (req.user.username === post.username){
        next()
    }else{
        getPostById(req).exec((err,post) => {
            if (err) {
                req.error = {
                    message: "Naruto Post not found",
                    status: 404
                }
                next()
            }
            if (post && req.user.username !== post.username){
                req.error = {
                    message: "You do not have permission to modify this Naruto Post",
                    status: 403
                }
            }
            next()
        })
    }
}


//exports variables for use elsewhere
module.exports = {
    getPosts,
    getPost,
    makePost,
    removePost,
    changePost,
    userAuthenticated,
    verifyOwner
}