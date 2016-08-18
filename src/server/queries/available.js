var db = require('./connection');

function setAvailability(req, res, next) {
  var authID = req.params.authID;
  var availability = req.body.availability;

  db.result(`
    UPDATE teachers SET isavailable = $1
    FROM teachers AS t INNER JOIN users AS u ON u.teacherid = t.id
    WHERE u.authid = $2
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
