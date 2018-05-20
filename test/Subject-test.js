//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Subject = require('../Subject/subject');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);



//Our parent block
describe("Subject", () => {
  before((done) => { //Before each test we empty the database
    Subject.remove({}, done);         
  });
  /*
  * Test the /GET route
  */

  describe('/GET subject', () => {
    it('404 error', (done) => {
      chai.request(server)
          .get('/subject') // wrong url
          .end((err, res) => {
            // should.exist(res)
              res.should.have.status(404);
            done();
          });
    });

    it('it should GET all the subjects, should be empty', (done) => {
        chai.request(server)
            .get('/subjects')
            .end((err, res) => {
              // should.exist(res)
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST subject', () => {
    it('it should POST a within-limits subject', (done) => {
      chai.request(server)
          .post('/subjects')
            .send({
              name : "Reginald",
              age : 2010,
              breed : "Human",
              gender: "M",
              colour: "Yellow"
            })
          .end((err, res) => {          
            done(err);
          });
      });

      it('it should not POST a subject without name field', (done) => {
        let subject = {
            age : 2010,
            breed : "Human",
            gender: "M",
            colour: "Yellow"
          }
            chai.request(server)
            .post('/subjects')
            .send(subject)
            .end((err, res) => {
                // console.log(res.error);
                // console.log(err);              
                res.should.have.status(500);
                res.should.be.a('object');
                res.should.have.property('error');
              done();
            });
      });
  });

  describe('/GET subject', () => {
    it('it should GET all the subjects, should have one', (done) => {
      chai.request(server)
          .get('/subjects')
          .end((err, res) => {
            // should.exist(res)
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
            done();
          });
    });
  });

  describe('/PUT subject', () => {
    it('it should UPDATE a subject given the id', (done) => {
      let subject = new Subject({name : "Molly",
                                  age : 2013,
                                  breed : "Cat",
                                  gender: "D",
                                  colour: "Blue"})
      subject.save((err, subject) => {
              chai.request(server)
              .put('/subjects/' + subject.id)
              .send({name: "Molly-G", age: 2014})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name').eql("Molly-G");
                  res.body.should.have.property('age').eql(2014);
                done();
              });
        });
    });

    it('UPDATE with incorrect ID', (done) => {            
        chai.request(server)
        .put('/subjects/' + 123)
        .send({name: "Molly-G", age: 2014})
        .end((err, res) => {
            res.should.have.status(500);
            res.should.have.property("error");
          done();
        });
    });


  });
});