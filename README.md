# Naruto Run (Server)

## by Ryan Challen, Adam Hyde & David Johnson (Team RAD)

#### Deployments

Client Deployed at: https://naruto-run.netlify.app/

Server Deployed at: https://naruto-run.herokuapp.com/

#### GitHub Repositories

Client: https://github.com/Team-RAD/Naruto_Run_Client

Server: https://github.com/Team-RAD/Naruto_Run_Server

#### .env file

.env file should contain the MongoDB URI connection string containing username, database and password.

#### Team Structure

The RAD team met up prior to project commencement to bond, clarify objectives and assign roles to better aid in our development process, thus maximizing our chances of a successful build.

Roles were assigned as follows:

- Ryan: RAD team leader and client-side lead
- Adam: Testing lead, database manager as well as utility between front-end and back-end build
- Dave: Concept design and server-side lead

We also decided our team would work together literally not just figuratively so we set up our HQ at Ryan’s house and spent every day of this project physically working side-by-side (keeping covid-safe of course).

Although the RAD team worked synergistically to complete the build of our application (which included lots of team-based programming, research, problem solving, and crossovers into each other’s arenas) we all had our specific duties we were ultimately responsible for. This ensured every key aspect of Naruto Run’s design, implementation, and testing had a specific member of the RAD team responsible for its success.

- Ryan's total contribution to the Naruto Run project: 33%
- Adam's total contribution to the Naruto Run project: 33%
- Dave's total contribution to the Naruto Run project: 33%
- 1% goes to Ryan's dogs Franklin and Cammy, without whom none of this would be possible.

#### Tech Stack:

- MongoDB for data storage
- ExpressJS for web server
- ReactJS for client UI
- NodeJS for server runtime
- Bootstrap4 for UI styling
- Mongoose for server middleware
- Netlify for front-end hosting
- Heroku for back-end hosting
- Git for source control

#### Server-Side Libraries:

_Dependencies:_

- Body-parser: extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with.
- Connect-Mongo: MongoDB session store for Connect and Express.
- CORS (Cross-Origin Resource Sharing): a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin
- Express-Session: Allows every user of your API or website to be assigned a unique session and this allows to store the user state.
- Mongoose: manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB is a mongodb driver for node
- Passport: Express-compatible authentication middleware for Node. js.
- Passport-local: Passport strategy for authenticating with a username and password.
- Passport-local-mongoose: Mongoose plugin that simplifies building username and password login with Passport.

_devDependencies:_

- Expect: This package exports the expect function used in testing.
- Mocha: Mocha is a feature rich JavaScript test framework running on node.js and in the browser making asynchronous testing simple and fun.
- Nodemon: Nodemon automatically starts the node application when files changes in the directory are detected.
- supertest: Supertest is a HTTP assertions library that allows you to test your node.js HTTP servers.

#### Thanks for stopping by! :)