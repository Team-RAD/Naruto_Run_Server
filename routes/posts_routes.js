// importing express
const express = require("express")
// defining the router using express 
const router = express.Router()
//pulls in from the posts_controller
const { getPosts, getPost, makePost, removePost, changePost, userAuthenticated, verifyOwner } = require("../controllers/posts_controller")

// READ
// GET on '/posts'
// Returns all posts
router.get("/", getPosts)

// READ
// GET on '/posts/:id'
// Returns post with given id
router.get("/:id", getPost)

//userauthenticated door from posts controller
router.use(userAuthenticated)

// CREATE
// POST on '/posts'
// Creates a new post
router.post("/", makePost)

// verifyOwner is the second door to make sure that the user owns the post
// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete("/:id", verifyOwner, removePost)

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put("/:id", verifyOwner, changePost)

// exporting router for use elsewhere
module.exports = router 