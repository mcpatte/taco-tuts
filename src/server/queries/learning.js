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

function getLearning(req, res, next){
  db.any('select * from learning')
    .then(respondWithData(res, "Retrieved the users to subjects learning table"))
    .catch(catchError(next))
}

function learningSubject(req, res, next){
  db.none('insert into learning(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
    .then(postData(res, `User with id of ${req.body.userID} is now learning subject ${req.body.subjectID}`))
    .catch(catchError(next));
};

function findSubjectsByUser(req, res, next){
    var userID = req.params.id;
  db.any('select users.name, learning.subjectID, subjects.name from users inner join learning on users.id = learning.userID inner join subjects on learning.subjectID = subjects.id WHERE users.authid = $1', [userID])
    .then(respondWithData(res, `Retrieved all subjects that ${req.body.name} wants to learn`))
    .catch(catchError(next));
};

function removeSubjectByUser(req, res, next){
  var userID = req.params.userID;
  var subjectID = parseInt(req.params.subjectID);
  db.result('DELETE FROM learning AS l USING users AS u WHERE l.userID = u.id AND u.authID = $1 AND l.subjectID = $2' , [userID, subjectID])
    .then(postData(res, `Removed ${result.rowCount} row's`))
    .catch(catchError(next));
};

module.exports = {
  getLearning: getLearning,
  learningSubject: learningSubject,
  findSubjectsByUser: findSubjectsByUser,
  removeSubjectByUser: removeSubjectByUser
};
