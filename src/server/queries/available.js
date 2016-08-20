var db = require('./connection');

function setAvailability(req, res, next) {
  var authID = req.params.authID;
  var availability = req.body.availability;

  db.any(`
    UPDATE teachers AS t SET isavailable = $1 FROM users AS u
    WHERE u.teacherid = t.id AND u.authid = $2
    RETURNING *
  `, [availability, authID]
  )
    .then(function(result) {
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
