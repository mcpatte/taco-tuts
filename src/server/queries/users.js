var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

//queries

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(respondWithData(res, "Retrieved all users"))
    .catch(catchError(next));
}

function getSingleUser(req, res, next){
  var authID = req.params.authID;
  db.any('select * from users where authID = $1', [authID])
    .then(function(data) {
      return !data[0].teacher ?
        data :
        db.any(`
          SELECT * FROM users INNER JOIN teachers
          ON teachers.id = users.teacherid
          WHERE users.authid = $1
        `, [authID]);
    })
    .then(respondWithData(res, `Retrieved single user`))
    .catch(catchError(next));
}

function createUser(req, res, next){
  db.none('insert into users(email, authid)' + 'values(${email}, ${authid})', req.body)
    .then(postData(res, "Successfully created a new user"))
    .catch(catchError(next));
}

function updateUser(req, res, next){
  var authID = req.params.authID;
    db.none('update users set username=coalesce($1, username), name=coalesce($2, name), email=coalesce($3, email), teacher=coalesce($4, teacher), teacherid=coalesce($5, teacherid), imageURL=coalesce($6, imageURL) where authID=$7', [req.body.username, req.body.name, req.body.email, req.body.teacher, req.body.teacherid, req.body.imageURL, authID], req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function removeUser(req, res, next){
  var authID = req.params.authID;
  db.result('delete from users where authid = $1', [authID])
    .then(postData(res, `Successfully removed ${req.body.email}!`))
    .catch(catchError(next));
}

function setAuthID(req, res, next) {
  var authID = req.params.authID;
  console.log("SetAuthID Info ", email, authID);
  var email = req.body.email;
  db.result(
    'update users set authID = $1 where email = $2',
    [authID, email]
  )
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Set AuthID of ${email} to ${authID}`,
          data: authID
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
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  setAuthID: setAuthID
};
