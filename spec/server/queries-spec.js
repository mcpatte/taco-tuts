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
        var harry = res.body.data[0];
        expect(harry.authid).toBe('auth8');
        expect(harry.name).toBe('Harry Potter');

        done();
      });
  });

  it('should create a user from their authid and email', function(done) {
    var user = {
      email: 'man@street.com',
      authid: 'secret'
    };

    util.apiRequest(server, 'post', '/api/users', user)
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.one('select * from users where authid=$1', [user.authid])
          .then(function(data) {
            expect(data.email).toBe(user.email);
            expect(data.authid).toBe(user.authid);
            done();
          });
      });
  });

  it('should update an existing user', function(done) {
    var update = {
      name: 'Dumbledore',
      email: 'ddore@gmail.com'
    };

    util.apiRequest(server, 'put', '/api/users/auth3', update)
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.one('select * from users where authid=$1', ['auth3'])
          .then(function(data) {
            expect(data.name).toBe(update.name);
            expect(data.email).toBe(update.email);
            done();
          });
      });
  });
});
