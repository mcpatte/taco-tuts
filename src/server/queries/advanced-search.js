var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData; 

function advancedSearch(req, res, next){
  let userParams = req.body;
  let qs1 = `select users.username, users.name, users.email, users.authid, 
             teachers.isAvailable, teaching.subjectid, teachers.rating `;
  let qs2 = `, subjects.name as subjectName `;
  let qs3 = 'inner join subjects on subjects.id=teaching.subjectid ';
  let qs4 = `inner join teachers on users.teacherid=teachers.id 
             inner join teaching on teaching.userid=users.id `;
  let fromUsers = 'from users ';
  let queryWhere = 'where ';

  if (!!userParams['name']) {
    let where1 = "lower(users.name) like lower('%" + userParams['name'] + "%') ";
    queryWhere += where1;
  }
  if (!!userParams['subject']) {
    qs1 = qs1.trim();
    qs1 += qs2 + fromUsers + qs4 + qs3;
    let fromOrInner2 = queryWhere.length > 6 ? 
      "and lower(subjects.name) like lower('%" + userParams['subject'] + "%')" 
      : "lower(subjects.name) like lower('%" + userParams['subject'] + "%') ";
    queryWhere += fromOrInner2;
  } else {
    qs1 += fromUsers + qs4;
  }
  if (!!userParams['rating']) {
    let where3 = queryWhere.length > 6 ? 
    'and teachers.rating=' + userParams['rating'] + ' ' 
    : 'teachers.rating=' + userParams['rating'] + ' ';
    queryWhere += where3;
  }
  if (!!userParams['isAvailable']) {
    let where4 = queryWhere.length > 6 ? 
    'and teachers.isAvailable=' + userParams['currentlyAvailable'] + ' ' 
    : 'teachers.isAvailable=' + userParams['currentlyAvailable'];
    queryWhere += where4;
  } else {
    let where4 = queryWhere.length > 6 ? 
      'and teachers.isavailable=true or teachers.isavailable=false ' 
      : 'teachers.isavailable=true or teachers.isavailable=false ';
    queryWhere += where4;
  }
  if (queryWhere.length > 6){
      qs1 += queryWhere;
    }
  console.log('---------->QUERY------------>',qs1);
    db.any(qs1)
      .then(respondWithData(res, "Retrieved results from advanced search"))
      .catch(catchError(next));
  }

module.exports = {
  advancedSearch: advancedSearch

}
