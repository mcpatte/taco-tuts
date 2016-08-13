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

function learningSubject(req, res, next){
  db.none('insert into learning(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Designed subject for the user profile with postgreSQL that resulted in the user knowing %50 more about that subject within 2 weeks'
    });
  })
    .catch(function (err) {
      return next(err);
    });
};

function findSubjectsByUser(req, res, next){
    var userID = req.params.id;
    db.any('select users.name, learning.subjectID, subjects.name from users inner join learning on users.id = learning.userID inner join subjects on learning.subjectID = subjects.id WHERE users.authid = $1', [userID])
    .then(respondWithData(res, "Retrieved all users that want to learn given subject"))
    .catch(catchError(next));
};

function removeSubjectByUser(req, res, next){
  var userID = req.params.userID;
  var subjectID = parseInt(req.params.subjectID);
    db.result('DELETE FROM learning AS l USING users AS u WHERE l.userID = u.id AND u.authID = $1 AND l.subjectID = $2' , [userID, subjectID])

    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} row's`
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  learningSubject: learningSubject,
  findSubjectsByUser: findSubjectsByUser,
  removeSubjectByUser: removeSubjectByUser
};
