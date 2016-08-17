var _ = require('lodash');

var users = require('./users');
var subjects = require('./subject');
var available = require('./available');
var learning = require('./learning');
var teaching = require('./teaching');
var sessions = require('./sessions');
var teachers = require('./teachers');
var advSearch = require('./advanced-search');
var instantSessions = require('./instant-sessions');


module.exports = _.assign({},
  users,
  subjects,
  available,
  learning,
  teaching,
  sessions,
  teachers,
  advSearch,
  instantSessions
);
