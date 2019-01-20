let mongoose = require("mongoose");
let Alert = require('../Alert/Alert');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);

console.log(JSON.stringify(db))
console.log(JSON.stringify(Alert))


//Our parent block
describe("Alerts", () => {
  before((done) => { //Before each test we empty the database
    Alert.remove({}, done);
  });
  /*
  * Test the /GET route
  */

  describe('/GET alerts', () => {
    it('404 error', (done) => {
      chai.request(server)
        .get('/alerts') // wrong url
        .end((err, res) => {
          console.log(res)
          console.log(err)          
          res.should.have.status(404);
          done();
        });
    });

    it('it should GET all the alerts, should be empty', (done) => {
      chai.request(server)
        .get('/alert')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  //   describe('/POST alerts', () => {
  //     it('it should POST a within-limits alerts', (done) => {
  //       chai.request(server)
  //           .post('/alerts')
  //             .send({
  //                 alerts: "This is a test alerts",
  //                 date : 1526779758,
  //                 type: "Notes",
  //                 provider : "Self",
  //                 subject : "Scoot"
  //             })
  //           .end((err, res) => {          
  //             done(err);
  //           });
  //       });

  //       it('it should not POST an alerts without alerts field', (done) => {
  //         let alerts = {
  //             date : 1526779758,
  //             type: "Notes",
  //             provider : "Self",
  //             subject : "Scoot"
  //           }
  //             chai.request(server)
  //             .post('/alertss')
  //             .send(alerts)
  //             .end((err, res) => {            
  //                 res.should.have.status(500);
  //                 res.should.be.a('object');
  //                 res.should.have.property('error');
  //               done();
  //             });
  //       });
  //   });

  //   describe('/GET alerts', () => {
  //     it('it should GET all the alertss, should have one', (done) => {
  //       chai.request(server)
  //           .get('/alertss')
  //           .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('array');
  //               res.body.length.should.be.eql(1);
  //             done();
  //           });
  //     });
  //   });

  //   describe('/PUT alerts', () => {
  //     it('it should UPDATE a alerts given the id', (done) => {
  //       let alerts = new Alerts({            
  //                         alerts: "This is a test alerts",
  //                         date : 1526779758000,
  //                         type: "Notes",
  //                         provider : "Self",
  //                         subject : "Scoot"
  //                     })
  //       alerts.save((err, alerts) => {
  //               chai.request(server)
  //               .put('/alertss/' + alerts.id)
  //               .send({alerts: "Everything is OK", date: 1521509357000})
  //               .end((err, res) => {
  //                   res.should.have.status(200);
  //                   res.body.should.be.a('object');
  //                   res.body.should.have.property('alerts').eql("Everything is OK");
  //                   res.body.should.have.property('date').eql("2018-03-20T01:29:17.000Z");
  //                 done();
  //               });
  //         });
  //     });

  //     it('UPDATE with incorrect ID', (done) => {            
  //         chai.request(server)
  //         .put('/alertss/' + 123)
  //         .send({alerts: "Everything is OK"})
  //         .end((err, res) => {
  //             res.should.have.status(500);
  //             res.should.have.property("error");
  //           done();
  //         });
  //     });
  //   });
});