// teacher and student are the relevant sockets
function Session(teacher, student, sessionID) {
  this.teacher = teacher;
  this.student = student;
  this.sessionID = sessionID;
  this.messages = [];
}

Session.prototype.start = function() {
  this.teacher.emit('start-session', { sessionID: this.sessionID, role: 'teacher' });
  this.student.emit('start-session', { sessionID: this.sessionID, role: 'student' });
};

Session.prototype.emitMessage = function(message) {
  this.teacher && this.teacher.emit('session-message', message);
  this.student && this.student.emit('session-message', message);
};

module.exports = Session;
