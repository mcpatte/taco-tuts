// var promise = require('bluebird');

// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// var pgp = require('pg-promise')(options);
// var connectionString = process.env.DATABASE_URL ||
//   'postgres://localhost:5432/tacobase';
// var db = pgp(connectionString);

// add query functions
// function getAllUsers(req, res, next) {
//   db.any('select * from users')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL users'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function getSingleUser(req, res, next){
//   var authID = req.params.authID;
//   console.log('in getSingleUser', authID);
//     db.any('select * from users where authID = $1', [authID])
//     .then(function (data) {
//       console.log("data from db", data);
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved one user'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function createUser(req, res, next){
//     db.none('insert into users(email, authid)' + 'values(${email}, ${authid})', req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one user'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function updateUser(req, res, next){
//   var userID = parseInt(req.params.id);
//     db.none('update users set username=$1, name=$2, email=$3, teacher=$4 where id=$5', [req.body.username, req.body.name, req.body.email, req.body.teacher, userID], req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated user'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function createSubject(req, res, next){
//     db.none('insert into subjects(name)' + 'values(${name})', req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one subject'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function getAllSubjects(req, res, next) {
//   db.any('select * from subjects')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL subjects'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function learningSubject(req, res, next){
//     db.none('insert into learning(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Designed subject for the user profile with postgreSQL that resulted in the user knowing %50 more about that subject within 2 weeks'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function teachingSubject(req, res, next){
//     db.none('insert into teaching(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Designed subject for the user profile with postgreSQL that resulted in the teacher knowing %50 more about that subject within 2 weeks'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function getSubjectForTeacher(req, res, next){
//   var userID = parseInt(req.params.id);
//   db.any('select users.name, teaching.subjectID, subjects.name from users inner join teaching on users.id = teaching.userID inner join subjects on teaching.subjectID = subjects.id WHERE users.id = $1', [userID])
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL subjects'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function getTeachersForSubject(req, res, next){
//   var subjectID = parseInt(req.params.id);
//   db.any('select teaching.userID, users.name, users.isAvailible, users.teacher from teaching JOIN users ON users.id = teaching.userID WHERE teaching.subjectID = $1', [subjectID])
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL subjects'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function getTeaching(req, res, next) {
//   db.any('select * from teaching')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL subjects'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

// function removeUser(req, res, next){
//   var userID = parseInt(req.params.id);
//     db.result('delete from users where id = $1', [userID])
//     .then(function (result) {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} row's`
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function removeSubject(req, res, next){
//   var subjectID = parseInt(req.params.id);
//     db.result('delete from subjects where id = $1', [subjectID])
//     .then(function (result) {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed subject!`
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function setAvailability(req, res, next) {
//   var authID = req.params.authID;
//   var availability = req.body.availability;

//   db.result(
//     'update users set isAvailible = $1 where authID = $2',
//     [availability, authID]
//   ).then(function(result) {
//     res.status(200)
//       .json({
//         status: 'success',
//         message: `Updated availability of ${authID} to ${availability}`
//       });
//   })
//   .catch(function(err) {
//     res.status(400)
//       .json({
//         status: 'failure',
//         message: err.message
//       });
//   });
// }

// function findSubjectsByUser(req, res, next){
//     var userID = req.params.id;
//     db.any('select users.name, learning.subjectID, subjects.name from users inner join learning on users.id = learning.userID inner join subjects on learning.subjectID = subjects.id WHERE users.authid = $1', [userID])
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Designed subject for the user profile with postgreSQL that resulted in the teacher knowing %50 more about that subject within 2 weeks'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function removeSubjectByUser(req, res, next){
//   var userID = req.params.userID;
//   var subjectID = parseInt(req.params.subjectID);
//     db.result('DELETE FROM learning AS l USING users AS u WHERE l.userID = u.id AND u.authID = $1 AND l.subjectID = $2' , [userID, subjectID])

//     .then(function (result) {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} row's`
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// };

// function setAuthID(req, res, next) {
//   var authID = req.params.authID;
//   console.log("SetAuthID Info ", email, authID);
//   var email = req.body.email;
//   db.result(
//     'update users set authID = $1 where email = $2',
//     [authID, email]
//   ).then(function(result) {
//     res.status(200)
//       .json({
//         status: 'success',
//         message: `Set AuthID of ${email} to ${authID}`,
//         data: authID
//       });
//   })
//   .catch(function(err) {
//     res.status(400)
//       .json({
//         status: 'failure',
//         message: err.message
//       });
//   });
// }

// module.exports = {
//   getAllUsers: getAllUsers,
//   getSingleUser: getSingleUser,
//   createUser: createUser,
//   createSubject: createSubject,
//   getAllSubjects: getAllSubjects,
//   learningSubject: learningSubject,
//   teachingSubject: teachingSubject,
//   updateUser: updateUser,
//   getSubjectForTeacher: getSubjectForTeacher,
//   getTeachersForSubject: getTeachersForSubject,
//   getTeaching: getTeaching,
//   removeUser: removeUser,
//   setAvailability: setAvailability,
//   findSubjectsByUser: findSubjectsByUser,
//   removeSubjectByUser: removeSubjectByUser,
//   removeSubject: removeSubject,
//   setAuthID: setAuthID
// };

