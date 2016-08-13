var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||
  'postgres://localhost:5432/tacobase';
var db = pgp(connectionString);

var helpers = require('./queryHelpers')
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

//queries

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(respondWithData(res, "Retrieved all users"))
    .catch(catchError());
}

function getSingleUser(req, res, next){
  var authID = req.params.authID;
  console.log('in getSingleUser', authID);
    db.any('select * from users where authID = $1', [authID])
    .then(respondWithData(res, "Retrieved single user"))
    .catch(catchError(next))
};

function createUser(req, res, next){
    db.none('insert into users(email, authid)' + 'values(${email}, ${authid})', req.body)
    .then(postData(res, "Successfully created a new user"))
    .catch(catchError(next));
};

function updateUser(req, res, next){
  var userID = parseInt(req.params.id);
    db.none('update users set username=$1, name=$2, email=$3, teacher=$4 where id=$5', [req.body.username, req.body.name, req.body.email, req.body.teacher, userID], req.body)
    .then(postData(res, "Successfully updated user"))
    .catch(catchError(next));
};

function removeUser(req, res, next){
  var userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', [userID])
    .then(postData(res, `Successfully removed ${req.body.email}!`))
    .catch(catchError(next));
};

function setAuthID(req, res, next) {
  var authID = req.params.authID;
  console.log("SetAuthID Info ", email, authID);
  var email = req.body.email;
  db.result(
    'update users set authID = $1 where email = $2',
    [authID, email]
  ).then(function(result) {
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
