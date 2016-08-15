process.env.NODE_ENV = 'test';

var request = require('supertest');
var server = require('../../src/server/server');
var db = require('../../src/server/queries/connection');
var util = require('../support/util');

var testdb = util.file('testdb.sql');
var testdata = util.file('testdata.sql');

function resetDB(done) {
  db.any(testdb)
    .then(function() {
      return db.any(testdata);
    })
    .then(done);
}

describe('the user queries', function() {
  beforeEach(resetDB);

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

  it('should delete an existing user', function(done) {
    util.apiRequest(server, 'delete', '/api/users/auth3')
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.any('select * from users where authid=$1', ['auth3'])
          .then(function(data) {
            expect(data.length).toBe(0);
            done();
          });
      });
  });
});

describe('the subject queries', function() {
  beforeEach(resetDB);

  it('should get all subjects', function(done) {
    util.apiRequest(server, 'get', '/api/subject')
      .end(function(err, res) {
        expect(res.body.data.length).toBe(5);
        done();
      });
  });

  it('should add a subject', function(done) {
    var subject = { name: 'chickendancing' };

    util.apiRequest(server, 'post', '/api/subject', subject)
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.one('select * from subjects where name=$1', [subject.name])
          .then(function(data) {
            expect(data.name).toBe(subject.name);
            done();
          });
      });
  });

  it('should delete a subject', function(done) {
    util.apiRequest(server, 'delete', '/api/subject/3')
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.any('select * from subjects where id=$1', [3])
          .then(function(data) {
            expect(data.length).toBe(0);
            done();
          });
      });
  });

  it('should get all teachers teaching a subject', function(done) {
    util.apiRequest(server, 'get', '/api/subject/4')
      .end(function(err, res) {
        expect(res.body.data.length).toBe(1);
        done();
      });
  });
});

describe('the teaching queries', function() {
  beforeEach(resetDB);

  it('should get all teachers and subject pairs', function(done) {
    util.apiRequest(server, 'get', '/api/teaching')
      .end(function(err, res) {
        expect(res.body.data.length).toBe(7);
        done();
      });
  });

  it('should add a subject to an existing teacher', function(done) {
    var teaching = { userID: 5, subjectID: 3 };

    util.apiRequest(server, 'post', '/api/teaching', teaching)
      .end(function(err, res) {
        expect(res.body.status).toBe('success');

        db.one(
          'select * from teaching where userid=$1 and subjectid=$2',
          [teaching.userID, teaching.subjectID]
        )
          .then(function(data) {
            expect(data.userid).toBe(teaching.userID);
            expect(data.subjectid).toBe(teaching.subjectID);
            done();
          });
      });
  });
});
