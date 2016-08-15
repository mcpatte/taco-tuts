process.env.NODE_ENV = 'test';

var path = require('path');
var pgp = require('pg-promise');
var server = require('../../src/server/server');
var db = require('../../src/server/queries/connection');
var request = require('supertest');

function file(name) {
  return new pgp.QueryFile(path.join(__dirname, '..', 'support', name));
}

var testdb = file('testdb.sql');
var testdata = file('testdata.sql');


describe('the server', function() {
  beforeEach(function(done) {
    db.any(testdb)
      .then(function() {
        return db.any(testdata);
      })
      .then(done);
  });

  it('should exist', function() {
    expect(server).toBeDefined();
  });

  it('should accept requests', function(done) {
    request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.data.length).toBe(8);

        done();
      });
  });
})
