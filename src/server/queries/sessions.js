var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||
  'postgres://localhost:5432/tacobase2';
var db = pgp(connectionString);

var helpers = require('./queryHelpers')
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;


function addAppointment(req, res, next) {
  db.any('insert into sessions(start, subjectid) values(${datetime}, ${subjectid}) returning * ', req.body)
    .then(respondWithData(res, "Added Appointment"))
    .catch(catchError)
    
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
    db.any('select sessions.id, subjects.name, users.username, sessions.start, sessions.subjectid, sessionsToUsers.userid from subjects inner join sessions on subjects.id = sessions.subjectid inner join sessionsToUsers on sessions.id = sessionsToUsers.sessionid inner join users on sessionsToUsers.userid = users.id WHERE sessionsToUsers.isTeacher = true AND sessionsToUsers.sessionid IN (select sessionsToUsers.sessionid from sessionsToUsers where sessionsToUsers.userid = $1) order by sessions.start asc' , [userID])
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


module.exports = {
  addAppointment: addAppointment,
  addSessionsToUsers: addSessionsToUsers,
  getAppointmentsByUser: getAppointmentsByUser,
  getAppointmentTutor: getAppointmentTutor
};