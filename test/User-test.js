//During the test the env variable is set to test

let mongoose = require("mongoose");
let User = require('../User/user');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);


//Our parent block
describe("Users", () => {
  before((done) => { //Before each test we empty the database
    User.remove({}, done);         
  });
  /*
  * Test the /GET route
  */

  describe('/GET user', () => {
    it('404 error', (done) => {
      chai.request(server)
          .get('/users/UFAIL') // wrong url
          .end((err, res) => {            
              res.should.have.status(404);
            done();
          });
    });

    it('it should GET all the users, should be empty', (done) => {
        chai.request(server)
            .get('/user/all')
            .end((err, res) => {              
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

//   describe('/POST users', () => {
//     it('it should POST a within-limits users', (done) => {
//       chai.request(server)
//           .post('/users')
//             .send({
//                 users: "This is a test users",
//                 date : 1526779758,
//                 type: "Notes",
//                 provider : "Self",
//                 subject : "Scoot"
//             })
//           .end((err, res) => {          
//             done(err);
//           });
//       });

//       it('it should not POST an users without users field', (done) => {
//         let users = {
//             date : 1526779758,
//             type: "Notes",
//             provider : "Self",
//             subject : "Scoot"
//           }
//             chai.request(server)
//             .post('/userss')
//             .send(users)
//             .end((err, res) => {            
//                 res.should.have.status(500);
//                 res.should.be.a('object');
//                 res.should.have.property('error');
//               done();
//             });
//       });
//   });

//   describe('/GET users', () => {
//     it('it should GET all the userss, should have one', (done) => {
//       chai.request(server)
//           .get('/userss')
//           .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body.length.should.be.eql(1);
//             done();
//           });
//     });
//   });

//   describe('/PUT users', () => {
//     it('it should UPDATE a users given the id', (done) => {
//       let users = new Users({            
//                         users: "This is a test users",
//                         date : 1526779758000,
//                         type: "Notes",
//                         provider : "Self",
//                         subject : "Scoot"
//                     })
//       users.save((err, users) => {
//               chai.request(server)
//               .put('/userss/' + users.id)
//               .send({users: "Everything is OK", date: 1521509357000})
//               .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('users').eql("Everything is OK");
//                   res.body.should.have.property('date').eql("2018-03-20T01:29:17.000Z");
//                 done();
//               });
//         });
//     });

//     it('UPDATE with incorrect ID', (done) => {            
//         chai.request(server)
//         .put('/userss/' + 123)
//         .send({users: "Everything is OK"})
//         .end((err, res) => {
//             res.should.have.status(500);
//             res.should.have.property("error");
//           done();
//         });
//     });
//   });
});