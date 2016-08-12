// teacher and student are the relevant sockets
function Session(id) {
  this.id = id;
  this.teachers= [];
  this.students = [];
  this.messages = [];
}

Session.prototype.addStudent = function(student) {
  this.students.push(student);
};

Session.prototype.addTeacher = function(teacher) {
  this.teachers.push(teacher);
};

Session.prototype.start = function() {
  const data = { sessionID: this.id };
  this.emitToAll('start-session', data);
};

Session.prototype.emitMessage = function(message) {
  this.messages.push(message);
  this.emitToAll('session-message', message);
};

Session.prototype.emitToTeachers = function(event, data) {
  this.teachers.forEach(function(teacher) {
    teacher.emit(event, {
      role: 'teacher',
      data: data
    });
  });
};

Session.prototype.emitToStudents = function(event, data) {
  this.students.forEach(function(student) {
    student.emit(event, {
      role: 'student',
      data: data
    });
  });
};

Session.prototype.emitToAll = function(event, data) {
  this.emitToTeachers(event, data);
  this.emitToStudents(event, data);
};

module.exports = Session;
