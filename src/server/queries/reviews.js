var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;

function addReview(req, res, next) {
  let data = req.body;
  let query = `INSERT INTO reviews (teacherAuthID, studentAuthID, review, rating) 
                values ($1, $2, $3, $4)
                RETURNING *`;
  db.one(query, [data.teacherID, data.studentID, data.review, data.rating])
    .then(helpers.respondWithData(res, 'Returning from addReview'));
    
  addRating(data.teacherID, data.rating)
}

function addRating(teacherID, rating) {
  return db.one('SELECT * FROM users JOIN teachers ON teachers.id=users.teacherid where users.authid=$1', [teacherID])
    .then( teacher => {
        let teacherID = teacher.teacherid;
        let ratingCount = teacher.ratingcount;
        let teacherRating = teacher.rating;
        let newAverage = (ratingCount * teacherRating + rating) / (ratingCount + 1);

  db.any('UPDATE teachers set rating=$1, ratingcount=$2 where teachers.id=$3 RETURNING *', [newAverage, ratingCount +1, teacherID]);
    })
}


function getReviews(req, res, next) {
  var userID = req.params.authid;
  db.any(`select reviews.*, student.name as studentname from users
          inner join reviews on reviews.teacherauthid=users.authid
          inner join users as student on reviews.studentauthid=student.authid 
          where users.authid=$1;`, [userID])
    .then(respondWithData(res, "Response from getReviews"))
    .catch(catchError(next));
}

module.exports = {
  addReview: addReview,
  getReviews: getReviews
};
