var db = require('./connection');

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
  db.any('select teaching.userID, users.name, users.teacher from teaching JOIN users ON users.id = teaching.userID WHERE teaching.subjectID = $1', [subjectID])
    .then(respondWithData(res, "Retrieved all teachers of given subject"))
    .catch(catchError(next));
};

function removeSubject(req, res, next){
  var subjectID = parseInt(req.params.id);
  db.result('delete from subjects where id = $1', [subjectID])
    .then(postData(res, `Sucessfully destroyed ${req.body.name} `))
    .catch(catchError(next));
};

module.exports = {
  getAllSubjects: getAllSubjects,
  createSubject: createSubject,
  getTeachersForSubject: getTeachersForSubject,
  removeSubject: removeSubject
};
