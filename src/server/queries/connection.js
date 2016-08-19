var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = 'postgres://localhost:5432/tacotest';
} else {
  connectionString = 'postgres://localhost:5432/tacobase4';
}

var db = pgp(connectionString);

module.exports = db;
