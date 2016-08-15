process.env.NODE_ENV = 'test';

var request = require('supertest');
var server = require('../../src/server/server');
var db = require('../../src/server/queries/connection');
var util = require('../support/util');

var testdb = util.file('testdb.sql');
var testdata = util.file('testdata.sql');

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

  it('should return all users', function(done) {
    util.apiRequest(server, 'get', '/api/users')
      .end(function(err, res) {
        expect(res.body.data.length).toBe(8);

        done();
      });
  });

  it('should return a specific user', function(done) {
    util.apiRequest(server, 'get', '/api/users/auth8')
      .end(function(err, res) {
        var harry = res.body.data;
        expect(harry.authid).toBe('auth8');
        expect(harry.name).toBe('Harry Potter');

        done();
      });
  });
})
