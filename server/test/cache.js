process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const CachedData = require('../models/cachedData'); 

const chai = require('chai.request(server)');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const requester = chai.request(server).keepOpen()

describe('/GET all Cached data', () => {
    it('it should GET all CachedData', (done) => {
        requester
            .get('/api/v1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});