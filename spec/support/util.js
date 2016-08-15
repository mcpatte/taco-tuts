var path = require('path');
var pgp = require('pg-promise');
var request = require('supertest');

var util = {
  file: function(name) {
    return new pgp.QueryFile(path.join(__dirname, '..', 'support', name));
  },

  apiRequest: function(server, method, route) {
    return request(server)
      [method](route)
      .expect('Content-Type', /json/)
      .expect(200);
  }
};

module.exports = util;
