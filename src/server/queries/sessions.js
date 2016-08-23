var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

function addAppointment(req, res, next) {
  db.any('insert into sessions(start, subjectid, confirmed, studentID, teacherID, duration, price, paid) values(${datetime}, ${subjectid}, ${confirmed}, ${studentid}, ${teacherid}, ${duration}, ${apptCost}, ${paid}) returning * ', req.body)
    .then(respondWithData(res, "Added Appointment"))
    .catch(catchError(next));
}

function getAppointmentsByStudent(req, res, next) {
  var studentID = parseInt(req.params.id);
    db.any('select sessions.id, subjects.name, users.username, sessions.start, sessions.subjectid, sessions.studentID, sessions.teacherID, sessions.confirmed, sessions.duration, sessions.price, sessions.paid from subjects inner join sessions on subjects.id = sessions.subjectid inner join users on sessions.teacherid = users.id WHERE sessions.id IN (select sessions.id from sessions where sessions.studentid = $1) order by sessions.start asc' , [studentID])
      .then(respondWithData(res, "Appointments by Student"))
      .catch(catchError(next));

}

function getAppointmentsByTeacher(req, res, next) {
  var teacherID = parseInt(req.params.id);
    db.any('select sessions.id, subjects.name, users.username, sessions.start, sessions.subjectid, sessions.studentID, sessions.teacherID, sessions.confirmed from subjects inner join sessions on subjects.id = sessions.subjectid inner join users on sessions.studentid = users.id WHERE sessions.id IN (select sessions.id from sessions where sessions.teacherid = $1) order by sessions.start asc' , [teacherID])
      .then(respondWithData(res, "Appointments by Teacher"))
      .catch(catchError(next));

}

function confirmAppt(req, res, next) {
  var sessionID = parseInt(req.params.sessionid);
  db.any('UPDATE sessions set confirmed = true where id = $1', [sessionID])
      .then(respondWithData(res, "Updated Appointment"))
      .catch(catchError)

}

function apptPaid(req, res, next) {
  var sessionID = parseInt(req.params.sessionid);
  db.any('UPDATE sessions set paid = true where id = $1', [sessionID])
      .then(respondWithData(res, "Appointment Paid"))
      .catch(catchError)

}


function removeAppt(req, res, next) {
  var sessionID = parseInt(req.params.sessionid); 
  db.any('DELETE from sessions where id = $1', [sessionID])
    .then(respondWithData(res, "Deleted Appointmet"))
    .catch(catchError)
}


module.exports = {
  addAppointment: addAppointment,
  getAppointmentsByStudent: getAppointmentsByStudent,
  getAppointmentsByTeacher: getAppointmentsByTeacher,
  confirmAppt: confirmAppt,
  removeAppt: removeAppt,
  apptPaid: apptPaid
};


