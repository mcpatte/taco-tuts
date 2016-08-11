let connections = {};

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
      const teachers = [connections[teacherID]];
      const students = [connections[studentID]];
      const channel = Math.random().toString(36).substring(4, 9);

      connections[teacherID].emit('start-session', { channel, role: 'teacher' });
      connections[studentID].emit('start-session', { channel, role: 'student' });
    });
  });
}

module.exports = initSocket;
