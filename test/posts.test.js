const request = require('supertest');
const express = require('express');
 
const app = express();
 
app.get('/posts', function(req, res) {
  res.status(200).json({ pre_tech_job: 'Payrodddll Officer' });
});
 

  describe('GET /posts', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/posts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });



  app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
  });

describe('GET /user', function() {
 it('responds with json', function(done) {
   request(app)
     .get('/user')
     .auth('username', 'password')
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect(200, done);
 });
});

