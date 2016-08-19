var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;



function getTeachersInfo(req, res, next){
  var teacherID = parseInt(req.params.id);
  db.any('select * from teachers JOIN users on users.teacherID = teachers.ID WHERE users.teacherID = $1 ', [teacherID])
    .then(respondWithData(res, "Retrieved all teacher info for user given user"))
    .catch(catchError(next));
}

function getAllTeachers(req, res, next){
  db.any('select * from teachers JOIN users on users.teacherID = teachers.ID WHERE users.teacher = true')
    .then(respondWithData(res, "Retrieved all teacher info for user given user"))
    .catch(catchError(next));
}

module.exports = {
  getTeachersInfo: getTeachersInfo,
  getAllTeachers: getAllTeachers
}