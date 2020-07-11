const { model } = require("mongoose")
const fs = require("fs")
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

const addPost = function(req) {
    try {
        const date = Date.now()
        let narutoPost = {
            create_date: date,
			modified_date: date,
            pre_tech_job: req.body.pre_tech_job,
            current_tech_job: req.body.current_tech_job,
            education: req.body.education,
            resources_required: req.body.resources_required,
            time_taken: req.body.time_taken,
            cost: req.body.cost,
            journey: req.body.journey,
            tech_stack: req.body.tech_stack,
            os_allegiance: req.body.os_allegiance,
            fueled_by: req.body.fueled_by,
            favourite_coding_playlist: req.body.favourite_coding_playlist,
            follow_me_links: req.body.follow_me_links
          }
          narutoPosts[getNextId()] = narutoPost
          fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(narutoPosts))
          return narutoPost
        }
        catch(error) {
            console.error(error)
            req.error = error
            return null
        }

    }

function getNextId() {
    let sortedIds = Object.keys(narutoPosts).sort()
    nextId = (sortedIds.length != 0)
                ? parseInt(sortedIds[sortedIds.length-1]) + 1
                : 1

    return nextId
}





//exporting the above functions for use elsewhere in the app
module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    loadData,
    getDataFileRelativeToApp
}