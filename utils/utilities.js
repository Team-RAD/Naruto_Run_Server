const { model } = require("mongoose")

let dataFile = "../data/naruto_posts.json"
let narutoPosts = require(dataFile)

// requests and returns all of the posts 
const getAllPosts = function(req) {
    return narutoPosts
}

// requests individual posts by id, returns if exists, if not returns error 
const getPostById = function(req) {
    let post = narutoPosts[req.params.id]
    if (post) return post
    else req.error = "Post not found"
}

//Loads data from dataFile with file system (fs)
function loadData(path) {
    narutoPosts = JSON.parse(fs.readFileSync(path, "utf8"))
}

//helper function to remove unnecessary path notation - to make relative to app
const getDataFileRelativeToApp = function(file) {
    return file.substring(file.lastIndexOf("../") + 3, file.length)

}

//exporting the above functions for use elsewhere in the app
module.exports = {
    getAllPosts,
    getPostById,
    loadData,
    getDataFileRelativeToApp
}