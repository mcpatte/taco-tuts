var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var db = require('./queries/exports');
var path = require('path');

var PORT;

if (process.env.PORT) {
  PORT = process.env.PORT;
} else if (process.env.NODE_ENV === 'test') {
  PORT = 3131;
} else {
  PORT = 3000;
}

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var connectionManager = require('./socket/socket')(io);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

app.use(function(req, res, next){
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body).length) console.log(`data: ${JSON.stringify(req.body)}`)
  next();
});

// add a reference to the socket connection manager to each request
app.use(function(req, res, next) {
  req.connectionManager = connectionManager;
  next();
});

app.get('/api/users', db.getAllUsers);
app.get('/api/users/:authID', db.getSingleUser);
app.get('/api/subject', db.getAllSubjects);
app.get('/api/teaching/:id', db.getSubjectForTeacher);
app.get('/api/teaching', db.getTeaching);
app.get('/api/learning', db.getLearning);
app.get('/api/subject/:id', db.getTeachersForSubject);
app.get('/api/learning/:id', db.findSubjectsByUser);
app.get('/api/teachers/:id', db.getTeachersInfo)
app.get('/api/teachers', db.getAllTeachers);
app.post('/api/users', db.createUser);
app.post('/api/subject', db.createSubject);
app.post('/api/learning', db.learningSubject);
app.post('/api/teaching', db.teachingSubject);
app.post('/api/users/:authID', db.setAuthID);
app.post('/api/teaching/:authID', db.insertTeacher);
app.post('/api/available/:authID', db.setAvailability);
app.post('/api/sessions', db.addAppointment);
app.post('/api/sessions/:sessionid', db.addSessionsToUsers);
app.post('/api/advanced-search', db.advancedSearch)
app.put('/api/users/:authID', db.updateUser);
app.delete('/api/users/:authID', db.removeUser);
app.delete('/api/subject/:id', db.removeSubject);
app.delete('/api/learning/:userID/:subjectID', db.removeSubjectByUser);
app.delete('/api/sessions/:sessionid', db.removeAppt);
app.get('/api/sessions/:id', db.getAppointmentsByUser);
app.get('/api/sessions/tutor/:sessionid', db.getAppointmentTutor);
app.post('/api/instantsessions', db.requestInstantSession);
app.delete('/api/instantsessions/:studentID/:teacherID', db.cancelStudentRequest);
app.delete('/api/instantsessions/:authID', db.cancelStudentRequests);
app.get('/api/instantsessions/student/:authID', db.getStudentRequests);
app.get('/api/instantsessions/teacher/:authID', db.getTeacherRequests);
app.put('/api/sessions/:sessionid', db.confirmAppt);
app.put('/api/learning', db.levelUp);



// serve `index.html` to all unmatched routes as a failsafe, to account for
// html5 pushstate. it would be better to only do this for valid routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

server.listen(PORT, function() {
  console.log("So many tacos here on " + PORT);
});

module.exports = app;
