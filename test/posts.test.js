const expect = require("expect")
const fs = require("fs")
const utilities = require("../utils/utilities")

//Use test data file 
const testDataFile = "./data/naruto_posts.test.json"

//Write file is relative to app.js
const testDataFileForWrite = utilities.getDataFileRelativeToApp(testDataFile)

beforeEach(() => {
    //Set and Load data from test data file
    setupData()
})

describe("getAllPosts with one post", () => {
    it("should get a post if one exists", () => {
        //Pass empty req object
        //the expected result is the length of keys in that object is at least 1
        expect(Object.keys(utilities.getAllPosts({})).length).toBe(1)
    })
        //the expected result is the username of the first post is tester
    it("user of first post should be tester", () => {
        expect(utilities.getAllPosts({})["1"].pre_tech_job).toBe("Payroll Officer")
    })
})

describe("getPostById", () => {
        //Define a req object with the expected structure to pass a parameter
        const req = {
            params: {
                id: "1"
            }
        }
        it("user of post with id1 should be tester", () => {
            //the expected result of username by retrieving post based on req result is tester
            expect(utilities.getPostById(req).pre_tech_job).toBe("Payroll Officer")
        })
})

describe("addPost", () => {
	it("should add a post", () => {
		// define a req object with expected structure
		const req = {
			body: {
                pre_tech_job: "Retail Assistant",
                current_tech_job: "Cyber Security Expert",
			}
		}
		let post = utilities.addPost(req)
		expect(post.pre_tech_job).toBe(req.body.pre_tech_job)
	})
	it("should update all narutoPosts", () => {
		// add the post again because setupData will clear the one we created
		utilities.addPost(req)
		let posts = utilities.getAllPosts({})
		expect(Object.keys(posts).length).toBe(2)
	})
})

describe("deletePost", () => {
	it("should delete the specified post", () => {
		let id = "1"
		let narutoPosts = utilities.deletePost(id)
		let ids = Object.keys(narutoPosts)
		expect(ids.includes("1")).toBe(false)
	})
})

function setupData() {
    let testPostData = {}
    let testPost = {}
    let date = Date.now()
    testPost.pre_tech_job = "Payroll Officer"
    testPost.current_tech_job = "Founder for music tech startup"
    testPost.create_date = date
    testPost.modified_date = date
    testPostData["1"] = testPost

    fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
    utilities.loadData(testDataFileForWrite)
}