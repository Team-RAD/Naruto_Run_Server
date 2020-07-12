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

//creates the add post constant using try catch
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
//function for getting the next ID - this is hoistered into addPost 
function getNextId() {
    let sortedIds = Object.keys(narutoPosts).sort()
    nextId = (sortedIds.length != 0)
                ? parseInt(sortedIds[sortedIds.length-1]) + 1
                : 1

    return nextId
}

//deletes a post by its id
const deletePost = function(id) {
    if (Object.keys(narutoPosts).includes(id)) {
        delete narutoPosts[id]
        fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(narutoPosts))
    }
    return narutoPosts
}

//updates a post based on its id
const updatePost = function(req) {
    try {
            let id = req.params.id
            if (!narutoPosts[id]) throw "Naruto Post not found"
            narutoPosts[id].pre_tech_job = req.body.pre_tech_job
            narutoPosts[id].current_tech_job = req.body.current_tech_job
            narutoPosts[id].education = req.body.education
            narutoPosts[id].resources_required = req.body.resources_required
            narutoPosts[id].time_taken = req.body.time_taken
            narutoPosts[id].cost = req.body.cost
            narutoPosts[id].journey = req.body.journey
            narutoPosts[id].tech_stack = req.body.tech_stack
            narutoPosts[id].os_allegiance = req.body.os_allegiance
            narutoPosts[id].fueled_by = req.body.fueled_by
            narutoPosts[id].favourite_coding_playlist = req.body.favourite_coding_playlist
            narutoPosts[id].follow_me_links = req.body.follow_me_links
            narutoPosts[id].modified_date = Date.now()
            fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(narutoPosts))
            return narutoPosts[id]
        
        } catch (error) {
            req.error = error
            return null
        }

}


//exporting the above functions for use elsewhere in the app
module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost,
    loadData,
    getDataFileRelativeToApp
}