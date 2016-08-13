var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var db = require('./queries/exports');
var path = require('path');

var PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
require('./socket')(io);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/api/users', db.getAllUsers);
app.get('/api/users/:authID', db.getSingleUser);
app.get('/api/subject', db.getAllSubjects);
app.get('/api/teaching/:id', db.getSubjectForTeacher);
app.get('/api/teaching', db.getTeaching);
app.get('/api/subject/:id', db.getTeachersForSubject);
app.post('/api/users', db.createUser);
app.post('/api/subject', db.createSubject);
app.post('/api/learning', db.learningSubject);
app.post('/api/teaching', db.teachingSubject);
app.post('/api/users/:authID', db.setAuthID);
app.put('/api/users/:authID', db.updateUser);
app.delete('/api/users/:id', db.removeUser);
app.delete('/api/subject/:id', db.removeSubject);
app.post('/api/available/:authID', db.setAvailability);
app.get('/api/learning/:id', db.findSubjectsByUser);
app.delete('/api/learning/:userID/:subjectID', db.removeSubjectByUser);


// serve `index.html` to all unmatched routes as a failsafe, to account for
// html5 pushstate. it would be better to only do this for valid routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

server.listen(PORT, function() {
  console.log("So many tacos here on 3000");
});

module.exports = app;
