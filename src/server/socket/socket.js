var ConnectionManager = require('./connection-manager');

var connectionManager = new ConnectionManager();

function initSocket(io) {
  io.on('connection', function(socket) {
    var userID = socket.handshake.query.userID;

    connectionManager.addConnection(userID, socket);

    socket.on('request-session', connectionManager.onSessionRequest);
    socket.on('accept-session', connectionManager.onSessionAccept);
    socket.on('session-message', connectionManager.onSessionMessage);
  });
}

module.exports = initSocket;
