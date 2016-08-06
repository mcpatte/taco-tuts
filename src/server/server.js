//require the modules that we need
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('./queries');
//initialize the app as an express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/users', db.getAllUsers);
app.get('/api/users/:id', db.getSingleUser);
app.post('/api/users', db.createUser);
app.post('/api/subject', db.createSubject);
app.get('/api/subject', db.getAllSubjects);
app.post('/api/learning', db.learningSubject);
app.post('/api/teaching', db.teachingSubject);
app.put('/api/users/:id', db.updateUser);
app.delete('/api/users/:id', db.removeUser);

app.use(express.static(__dirname + '/../dist'));

app.listen(PORT, function() {
  console.log("So many tacos here on 3000");
});

module.exports = app;
