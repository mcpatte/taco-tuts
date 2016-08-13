var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||
  'postgres://localhost:5432/tacobase';
var db = pgp(connectionString);

var helpers = require('./queryHelpers')
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

function getAllSubjects(req, res, next) {
  db.any('select * from subjects')
    .then(respondWithData(res, "Retrieved all subjects"))
    .catch(catchError(next))
};

function createSubject(req, res, next){
  db.none('insert into subjects(name)' + 'values(${name})', req.body)
    .then(postData(res, `Successfully created ${req.body.name}`))
    .catch(catchError(next));
};

function getTeachersForSubject(req, res, next){
  var subjectID = parseInt(req.params.id);
  db.any('select teaching.userID, users.name, users.isAvailible, users.teacher from teaching JOIN users ON users.id = teaching.userID WHERE teaching.subjectID = $1', [subjectID])
    .then(respondWithData(res, "Retrieved all teachers of given subject"))
    .catch(catchError(next));
};

function removeSubject(req, res, next){
  var subjectID = parseInt(req.params.id);
    db.result('delete from subjects where id = $1', [subjectID])
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed subject!`
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getAllSubjects: getAllSubjects,
  createSubject: createSubject,
  getTeachersForSubject: getTeachersForSubject,
  removeSubject: removeSubject
};
