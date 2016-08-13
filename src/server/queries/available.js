var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||
  'postgres://localhost:5432/tacobase';
var db = pgp(connectionString);

function setAvailability(req, res, next) {
  var authID = req.params.authID;
  var availability = req.body.availability;

  db.result(
    'update users set isAvailible = $1 where authID = $2',
    [availability, authID]
  ).then(function(result) {
    res.status(200)
      .json({
        status: 'success',
        message: `Updated availability of ${authID} to ${availability}`
      });
  })
  .catch(function(err) {
    res.status(400)
      .json({
        status: 'failure',
        message: err.message
      });
  });
}

module.exports = {
  setAvailability: setAvailability
};
