//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Provider = require('../Provider/provider');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);



//Our parent block
describe("Provider", () => {
  before((done) => { //Before each test we empty the database
    Provider.remove({}, done);         
  });
  /*
  * Test the /GET route
  */

  describe('/GET provider', () => {
    it('404 error', (done) => {
      chai.request(server)
          .get('/provider') // wrong url
          .end((err, res) => {            
              res.should.have.status(404);
            done();
          });
    });

    it('it should GET all the providers, should be empty', (done) => {
        chai.request(server)
            .get('/providers')
            .end((err, res) => {              
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST provider', () => {
    it('it should POST a within-limits provider', (done) => {
      chai.request(server)
          .post('/providers')
            .send({
              name : "TestVet",
              type : "Vet",
              pPhone : "1232343456",
              sPhone: "0989878765",
              comp: "Company"
            })
          .end((err, res) => {          
            done(err);
          });
      });

      it('it should not POST a provider without name field', (done) => {
        let provider = {
            type : "Vet",
            pPhone : "1232343456",
            sPhone: "0989878765",
            comp: "Company"
          }
            chai.request(server)
            .post('/providers')
            .send(provider)
            .end((err, res) => {            
                res.should.have.status(500);
                res.should.be.a('object');
                res.should.have.property('error');
              done();
            });
      });
  });

  describe('/GET provider', () => {
    it('it should GET all the providers, should have one', (done) => {
      chai.request(server)
          .get('/providers')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
            done();
          });
    });
  });

  describe('/PUT provider', () => {
    it('it should UPDATE a provider given the id', (done) => {
      let provider = new Provider({name : "TestFarrier",
                                    type : "Farrier",
                                    pPhone : "1232343456",
                                    sPhone: "0989878765",
                                    comp: "Company"})
      provider.save((err, provider) => {
              chai.request(server)
              .put('/providers/' + provider.id)
              .send({name: "DuramFarrier", pPhone: "6547335432"})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name').eql("DuramFarrier");
                  res.body.should.have.property('pPhone').eql("6547335432");
                done();
              });
        });
    });

    it('UPDATE with incorrect ID', (done) => {            
        chai.request(server)
        .put('/providers/' + 123)
        .send({name: "DuramFarrier", age: 2014})
        .end((err, res) => {
            res.should.have.status(500);
            res.should.have.property("error");
          done();
        });
    });
  });
});