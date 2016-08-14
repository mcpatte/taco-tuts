var db = require('./connection');
var helpers = require('./queryHelpers')
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;


function teachingSubject(req, res, next){
  db.none('insert into teaching(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
    .then(postData(res, `Teacher with id: ${req.body.userID} is now teaching subject with id: ${req.body.subjectID}`))
    .catch(catchError(next));
};

function getSubjectForTeacher(req, res, next){
  var userID = parseInt(req.params.id);
  db.any('select users.name, teaching.subjectID, subjects.name from users inner join teaching on users.id = teaching.userID inner join subjects on teaching.subjectID = subjects.id WHERE users.id = $1', [userID])
    .then(respondWithData(res, "Retrieved all subjects of a given teacher"))
    .catch(catchError(next));
}

function getTeaching(req, res, next) {
  db.any('select * from teaching')
    .then(respondWithData(res, "Retrieved table of userid's and subjectid's"))
    .catch(catchError(next));
}

module.exports = {
  teachingSubject: teachingSubject,
  getSubjectForTeacher: getSubjectForTeacher,
  getTeaching: getTeaching
};
