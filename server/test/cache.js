process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let CachedData = require('../models/cachedData'); 

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// describe('/GET all Cached data', () => {
//     it('it should GET all CachedData', (done) => {
//         chai.request(server)
//             .get('/')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);

//                 done();
//             });
//     });
// });