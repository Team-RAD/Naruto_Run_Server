const supertest = require("supertest");
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
        .send({ pre_tech_job: "Payroll Officer",
                current_tech_job: "Founder for music tech startup",
                education: "Diploma of IT from Coder Academy, Code Academy, Udemy",
                resources_required: "Laptop, coding bootcamp and online subscriptions",
                time_taken: "16 months",
                cost: "26000",
                journey: "I tried a music technology startup a few years ago and one of my biggest fail points was my lack of coding/technology knowledge to be able to effectively communicate with a development team. I started at Coder Academy's Gentech bootcamp in October 2019 and learnt everything necessary to be a successful founder.",
                tech_stack: "Ruby on Rails, MERN",
                os_allegiance: "Windows",
                fueled_by: "coffee and red bull",
                favourite_coding_playlist: "ethereal",
                follow_me_links: "davo@davo.com"})
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
    // it("it should return status code 200 if post is created by authorised user", function(done) {
    //   supertest(app)
    //     .post("/posts")
    //     .send({ pre_tech_job: "Payroll Officer",
    //             current_tech_job: "Founder for music tech startup",
    //             education: "Diploma of IT from Coder Academy, Code Academy, Udemy",
    //             resources_required: "Laptop, coding bootcamp and online subscriptions",
    //             time_taken: "16 months",
    //             cost: "26000",
    //             journey: "I tried a music technology startup a few years ago and one of my biggest fail points was my lack of coding/technology knowledge to be able to effectively communicate with a development team. I started at Coder Academy's Gentech bootcamp in October 2019 and learnt everything necessary to be a successful founder.",
    //             tech_stack: "Ruby on Rails, MERN",
    //             os_allegiance: "Windows",
    //             fueled_by: "coffee and red bull",
    //             favourite_coding_playlist: "ethereal",
    //             follow_me_links: "davo@davo.com"})
    //     .expect(200)
    //     .end(function(err, res){
    //       if (err) done(err);
    //       done();
    //     });
    // });
  });