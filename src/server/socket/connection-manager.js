function ConnectionManager() {
  this.connections = {};
}

ConnectionManager.prototype.add = function(id, socket) {
  this.connections[id] = socket;
};

ConnectionManager.prototype.get = function(id) {
  return this.connections[id];
};

module.exports = ConnectionManager;
