const express = require("express")
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

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete("/:id", verifyOwner, removePost)

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put("/:id", verifyOwner, changePost)

module.exports = router 