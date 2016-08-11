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
      const sockets = [connections[teacherID], connections[studentID]];
      const channel = Math.random().toString(36).substring(4, 9);

      sockets.forEach((socket) => {
        socket.emit('start-session', { channel });
      });
    });
  });
}

module.exports = initSocket;
