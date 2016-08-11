let connections = {};

function initSocket(io) {
  io.on('connection', function(socket) {
    const userID = socket.handshake.query.userID;
    connections = Object.assign(connections, { [userID]: socket });

    socket.emit('message', { hi: 'mom' });
  });
}

module.exports = initSocket;
