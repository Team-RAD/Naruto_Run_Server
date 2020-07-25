const supertest = require("supertest");
const agent = supertest.agent('localhost:3006')
const assert = require('assert');
const app = require("../app");
let randomName = Math.random().toString(36).substring(7);
//  tests if get on root "/" generates a 200 response, and get on "/posts" and "/posts/id" generates a JSON
describe("GET /", function() {
    it("it should respond with a status code of 200", function(done) {
      supertest(app)
        .get("/")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
    it("it should respond with a JSON ", function(done){
        supertest(app)
          .get("/posts")
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) done(err);
            done();
          });
    });
    it("it should respond with a JSON if post exists", function(done){
        supertest(app)
          .get("/posts/5f0a901d90fd6615c12c2154")
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(function(err, res){
            if (err) done(err);
            done();
          });
    });
    it("it should respond with a status 404 if post doesn't exist", function(done){
        supertest(app)
          .get("/posts/post_non_existant")
          .expect(404)
          .end(function(err, res){
            if (err) done(err);
            done();
          });
    });
  });
  //test post from unauthorised user
describe("POST /", function(){
    it("it should return status code 403 (forbidden) if post creator is not authorised", function(done) {
      supertest(app)
        .post("/posts")
        .send({ pre_tech_job: "Event Organiser",
                current_tech_job: "Student of Technology",
                education: "Diploma of IT from Coder Academy",
                resources_required: "Laptop, coding bootcamp and online subscriptions",
                time_taken: "9 months",
                cost: "25000",
                journey: "The journey of life is full or many suprises and I dislike most of them lol",
                tech_stack: "Ruby on Rails, MERN",
                os_allegiance: "Windows",
                fueled_by: "Coffee and energy drinks",
                favourite_coding_playlist: "Whatever is trending at the time is fine",
                follow_me_links: "https://github.com/AdamCoderAcademy"})
        .expect(403)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
  });
  // test user registration, logout, login, create NarutoPost
  describe("POST /", function(){
    it("it should return status code 200 if registration successful", function(done) {
      supertest(app)
        .post("/auth/register")
        .send({ username: randomName,
                email: "adam@hyde.com",
                password: "123456"
        })
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
    it("it should return status code 200 if logout successful", function(done) {
      supertest(app)
        .get("/auth/logout")
        .send({ username: randomName,
                email: "adam@hyde.com",
                password: "123456"
        })
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
    it("it should return status code 200 if login successful", function(done) {
      supertest(app)
        .post("/auth/login")
        .send({ username: randomName,
                email: "adam@hyde.com",
                password: "123456"
        })
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
  });
  describe('Login', function () {
    it('should login superadmin', function(done) {
      agent
        .post('/auth/login')
        .send({ username: randomName,
          email: "adam@hyde.com",
          password: "123456"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // agent.saveCookies(res); don't need this line 
          return done();
        });
    });
  it("it should return status code 200 if post is created by authorised user", function(done) {
    agent
      .post("/posts")
      .send({ pre_tech_job: "Autobot",
              current_tech_job: "Decepticon",
              education: "The streets",
              resources_required: "Quintessons",
              time_taken: "16 months",
              cost: "99000000",
              journey: "The civil war on Cybertron between the Autobots and Decepticons was instigated by Megatron, and fought over control of the cube. The planet was destroyed in the process of the war, and the cube was lost in the far reaches of space, otherwise known as Earth. Carbon dating places its arrival here around 10,000 B.C",
              tech_stack: "Prototypical Targetmaster technology",
              os_allegiance: "Windows",
              fueled_by: "The Allspark",
              favourite_coding_playlist: "metal",
              follow_me_links: "optimus_prime@autobots.com"})
      .expect(201)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});