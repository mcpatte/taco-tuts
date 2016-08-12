var ConnectionManager = require('./connection-manager');
var Session = require('./session');

var connectionManager = new ConnectionManager();
let sessions = {};

function initSocket(io) {
  io.on('connection', function(socket) {
    const userID = socket.handshake.query.userID;
    connectionManager.add(userID, socket);

    socket.on('request-session', onSessionRequest);
    socket.on('accept-session', onSessionAccept);
    socket.on('session-message', onSessionMessage);
  });
}

function onSessionRequest(data) {
  const { teacherID, student } = data;
  const teacherSocket = connectionManager.get(teacherID);

  if (teacherSocket) {
    teacherSocket.emit('request-session', { student });
  }
}

function onSessionAccept(data) {
  const { teacherID, studentID } = data;
  const sessionID = Math.random().toString(36).substring(4, 9);
  const session = new Session(sessionID);

  sessions[sessionID] = session;

  session.addTeacher(connectionManager.get(teacherID));
  session.addStudent(connectionManager.get(studentID));
  session.start();
}

function onSessionMessage(data) {
  const { sessionID, message } = data;
  const session = sessions[sessionID];
  session.emitMessage(message);
}

module.exports = initSocket;
