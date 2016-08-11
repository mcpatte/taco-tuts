const Session = require('./session');

let connections = {};
let sessions = {};

function initSocket(io) {
  io.on('connection', function(socket) {
    const userID = socket.handshake.query.userID;
    connections = Object.assign(connections, { [userID]: socket });

    socket.on('request-session', onSessionRequest);
    socket.on('accept-session', onSessionAccept);
    socket.on('session-message', onSessionMessage);
  });
}

function onSessionRequest(data) {
  const { teacherID, student } = data;
  const teacherSocket = connections[teacherID];

  if (teacherSocket) {
    teacherSocket.emit('request-session', { student });
  }
}

function onSessionAccept(data) {
  const { teacherID, studentID } = data;
  const sessionID = Math.random().toString(36).substring(4, 9);
  const teacher = connections[teacherID];
  const student = connections[studentID];

  const session = new Session(teacher, student, sessionID);

  sessions[sessionID] = session;
  session.start();
}

function onSessionMessage(data) {
  const { sessionID, message } = data;
  const session = sessions[sessionID];
  session.emitMessage(message);
}

module.exports = initSocket;
