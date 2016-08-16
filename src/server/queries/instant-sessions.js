var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;

function requestInstantSession(req, res, next) {
  var studentID = parseInt(req.body.studentID);
  var teacherID = parseInt(req.body.teacherID);
  var subjectID = parseInt(req.body.subjectID);

  db.one(`INSERT INTO instantSessionRequests (studentID, teacherID, subjectID)
    VALUES ($1, $2, $3) RETURNING *`, [studentID, teacherID, subjectID] )
    .then(respondWithData(res, 'Added live session'))
    .catch(catchError(next));
}

module.exports = {
  requestInstantSession: requestInstantSession
};
