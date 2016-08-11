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
  });
}

module.exports = initSocket;
