const Session = require('./session');

let connections = {};
let sessions = {};

function initSocket(io) {
  io.on('connection', function(socket) {
    const userID = socket.handshake.query.userID;
    connections = Object.assign(connections, { [userID]: socket });

    socket.on('request-session', function(data) {
      const { teacherID, student } = data;
      const teacherSocket = connections[teacherID];

      if (teacherSocket) {
        teacherSocket.emit('request-session', { student });
      }
    });

    socket.on('accept-session', function(data) {
      const { teacherID, studentID } = data;
      const sessionID = Math.random().toString(36).substring(4, 9);
      const teacher = connections[teacherID];
      const student = connections[studentID];

      const session = new Session(teacher, student, sessionID);

      sessions[sessionID] = session;
      session.start();
    });

    socket.on('session-message', function(data) {
      const { sessionID, message } = data;
      const session = sessions[sessionID];
      session.emitMessage(message);
    });
  });
}

module.exports = initSocket;
