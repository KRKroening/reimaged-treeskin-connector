//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Entry = require('../Entry/entry');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);



//Our parent block
describe("Entry", () => {
  before((done) => { //Before each test we empty the database
    Entry.remove({}, done);         
  });
  /*
  * Test the /GET route
  */

  describe('/GET entry', () => {
    it('404 error', (done) => {
      chai.request(server)
          .get('/entry') // wrong url
          .end((err, res) => {            
              res.should.have.status(404);
            done();
          });
    });

    it('it should GET all the entrys, should be empty', (done) => {
        chai.request(server)
            .get('/entrys')
            .end((err, res) => {              
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST entry', () => {
    it('it should POST a within-limits entry', (done) => {
      chai.request(server)
          .post('/entrys')
            .send({
                entry: "This is a test entry",
                date : 1526779758,
                type: "Notes",
                provider : "Self",
                subject : "Scoot"
            })
          .end((err, res) => {          
            done(err);
          });
      });

      it('it should not POST a entry without entry field', (done) => {
        let entry = {
            date : 1526779758,
            type: "Notes",
            provider : "Self",
            subject : "Scoot"
          }
            chai.request(server)
            .post('/entrys')
            .send(entry)
            .end((err, res) => {            
                res.should.have.status(500);
                res.should.be.a('object');
                res.should.have.property('error');
              done();
            });
      });
  });

  describe('/GET entry', () => {
    it('it should GET all the entrys, should have one', (done) => {
      chai.request(server)
          .get('/entrys')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
            done();
          });
    });
  });

  describe('/PUT entry', () => {
    it('it should UPDATE a entry given the id', (done) => {
      let entry = new Entry({            
                        entry: "This is a test entry",
                        date : 1526779758000,
                        type: "Notes",
                        provider : "Self",
                        subject : "Scoot"
                    })
      entry.save((err, entry) => {
              chai.request(server)
              .put('/entrys/' + entry.id)
              .send({entry: "Everything is OK", date: 1521509357000})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('entry').eql("Everything is OK");
                  res.body.should.have.property('date').eql("2018-03-20T01:29:17.000Z");
                done();
              });
        });
    });

    it('UPDATE with incorrect ID', (done) => {            
        chai.request(server)
        .put('/entrys/' + 123)
        .send({entry: "Everything is OK"})
        .end((err, res) => {
            res.should.have.status(500);
            res.should.have.property("error");
          done();
        });
    });
  });
});