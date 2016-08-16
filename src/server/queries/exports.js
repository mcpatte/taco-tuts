var users = require('./users');
var subjects = require('./subject');
var available = require('./available');
var learning = require('./learning');
var teaching = require('./teaching');
var sessions = require('./sessions');
var teachers = require('./teachers');

module.exports = {
  getAllUsers: users.getAllUsers,
  getSingleUser: users.getSingleUser,
  createUser: users.createUser,
  updateUser: users.updateUser,
  removeUser: users.removeUser,
  setAuthID: users.setAuthID,
  getTeachersForSubject: subjects.getTeachersForSubject,
  createSubject: subjects.createSubject,
  getAllSubjects: subjects.getAllSubjects,
  removeSubject: subjects.removeSubject,
  getLearning: learning.getLearning,
  learningSubject: learning.learningSubject,
  findSubjectsByUser: learning.findSubjectsByUser,
  removeSubjectByUser: learning.removeSubjectByUser,
  teachingSubject: teaching.teachingSubject,
  getSubjectForTeacher: teaching.getSubjectForTeacher,
  getTeaching: teaching.getTeaching,
  insertTeacher: teaching.insertTeacher,
  addAppointment: sessions.addAppointment,
  addSessionsToUsers: sessions.addSessionsToUsers,
  getAppointmentsByUser: sessions.getAppointmentsByUser,
  getAppointmentTutor: sessions.getAppointmentTutor,
  getTeachersInfo: teachers.getTeachersInfo,
  getAllTeachers: teachers.getAllTeachers,
  setAvailability: available.setAvailability
};

