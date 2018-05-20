//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Type = require('../Type/type');
let db = require("../db");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server = "http://localhost:3000"
let should = chai.should();

chai.use(chaiHttp);



//Our parent block
describe("Type", () => {
  before((done) => { //Before each test we empty the database
    Type.remove({},function (err, model){ 
        if(err){
            return err
        }
        Type.create({name : "TestingType",
                        subtype : ["TestOne", "TestTwo", "TestThree"]},
                    {name : "TestingName",
                        subtype : ["FooBar", "Bar", "Foo"]}
                    , done);
    });    
  });
// done has to be called in the callback, otherwise it resolves before the action has occured.

  /*
  * Test the /GET route
  */

  describe('/GET type', () => {
    it('404 error', (done) => {
      chai.request(server)
          .get('/type') // wrong url
          .end((err, res) => {            
              res.should.have.status(404);
            done();
          });
    });

    it('it should GET all the types, should be 2', (done) => {
        chai.request(server)
            .get('/types')
            .end((err, res) => {              
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
              done();
            });
      });
  });

  // Type has not POST

//   describe('/POST type', () => {
//     it('it should POST a within-limits type', (done) => {
//       chai.request(server)
//           .post('/types')
//             .send({
//               name : "TestingType",
//               subtype : ["TestOne", "TestTwo", "TestThree"]
//             })
//           .end((err, res) => {          
//             done(err);
//           });
//       });

//       it('it should not POST a type without subtype field', (done) => {
//         let type = {
//             name : "TestingType",
//           }
//             chai.request(server)
//             .post('/types')
//             .send(type)
//             .end((err, res) => {
//                 // console.log(res.error);
//                 // console.log(err);              
//                 res.should.have.status(500);
//                 res.should.be.a('object');
//                 res.should.have.property('error');
//               done();
//             });
//       });
//   });


// Type has no PUT

//   describe('/PUT type', () => {
//     it('it should UPDATE a type given the id', (done) => {              
//               let type = new Type({name : "TestingTypeDuplex", subtype : ["TestOne", "TestTwo", "TestThree", "TestFour"] })
//       type.save((err, type) => {
//               chai.request(server)
//               .put('/types' + type.id)
//               .send({name: "JustAName"})
//               .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('name').eql("JustAName");
//                   res.body.should.be.a('array'); 
//                   res.body.should.have.property('subtype').length(4);
//                 done();
//               });
//         });
//     });

//     it('UPDATE with incorrect ID', (done) => {            
//         chai.request(server)
//         .put('/types' + 123)
//         .send({name: "JustANameRename"})
//         .end((err, res) => {
//             res.should.have.status(500);
//             res.should.have.property("error");
//           done();
//         });
//     });
//   });
});