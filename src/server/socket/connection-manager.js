var _ = require('lodash');
var Session = require('./session');

function ConnectionManager() {
  this.connections = {};
  this.sessions = {};

  _.each(ConnectionManager.prototype, function(method, name) {
    this[name] = method.bind(this);
  }.bind(this));
}

ConnectionManager.prototype.addConnection = function(id, socket) {
  this.connections[id] = socket;
};

ConnectionManager.prototype.getConnection = function(id) {
  return this.connections[id];
};

ConnectionManager.prototype.onSessionRequest = function(data) {
  var { teacherID, student } = data;
  var teacherSocket = this.getConnection(teacherID);

  if (teacherSocket) {
    teacherSocket.emit('request-session', { role: 'teacher', data: { student } });
  }
};

ConnectionManager.prototype.onSessionAccept = function(data) {
  var { teacherID, studentID } = data;
  var sessionID = Math.random().toString(36).substring(4, 9);
  var session = new Session(sessionID);

  this.sessions[sessionID] = session;

  session.addTeacher(this.getConnection(teacherID));
  session.addStudent(this.getConnection(studentID));
  session.start();
};

ConnectionManager.prototype.onSessionMessage = function(data) {
  var { sessionID, message } = data;
  var session = this.sessions[sessionID];
  session.emitMessage(message);
};

module.exports = ConnectionManager;
