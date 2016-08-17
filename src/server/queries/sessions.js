var db = require('./connection');

var helpers = require('./queryHelpers')
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

function addAppointment(req, res, next) {
  db.any('insert into sessions(start, subjectid, confirmed) values(${datetime}, ${subjectid}, ${confirmed}) returning * ', req.body)
    .then(respondWithData(res, "Added Appointment"))
    .catch(catchError(next));

    // .then(function (result) {
    //   res.status(200)
    //     .json({
    //       status: 'success',
    //       data: result,
    //       message: 'Added Appointment'
    //     });
    // })
    // .catch(function (err) {
    //   return next(err);
    // });
}


function addSessionsToUsers(req, res, next) {
  db.any('insert into sessionsToUsers(sessionID, userID, isTeacher) values(${sessionID}, ${userID}, ${isTeacher})', req.body)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added User to Appointment'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAppointmentsByUser(req, res, next) {
  var userID = parseInt(req.params.id);
    db.any('select sessions.id, subjects.name, users.username, sessions.start, sessions.subjectid, sessionsToUsers.userid, sessionsToUsers.isTeacher, sessions.confirmed from subjects inner join sessions on subjects.id = sessions.subjectid inner join sessionsToUsers on sessions.id = sessionsToUsers.sessionid inner join users on sessionsToUsers.userid = users.id WHERE sessionsToUsers.sessionid IN (select sessionsToUsers.sessionid from sessionsToUsers where sessionsToUsers.userid = $1) order by sessions.start asc' , [userID])
      .then(function (result) {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Added Appointment'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}


function getAppointmentTutor(req, res, next) {
  var sessionID = parseInt(req.params.sessionid);
  console.log("session id from query", sessionID)
    db.any('SELECT users.name FROM users INNER JOIN sessionsToUsers ON users.id = sessionsToUsers.userid WHERE sessionsToUsers.sessionid = $1 AND sessionsToUsers.isTeacher = true', [sessionID])
      .then(function (result) {
        res.status(200)
          .json({
            status: 'success',
            data: result,
            message: 'Added Appointment'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}


function confirmAppt(req, res, next) {
  var sessionID = parseInt(req.params.sessionid);
  db.any('UPDATE sessions set confirmed = true where id = $1', [sessionID])
      .then(respondWithData(res, "Updated Appointment"))
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
  addSessionsToUsers: addSessionsToUsers,
  getAppointmentsByUser: getAppointmentsByUser,
  getAppointmentTutor: getAppointmentTutor,
  confirmAppt: confirmAppt,
  removeAppt: removeAppt
};
