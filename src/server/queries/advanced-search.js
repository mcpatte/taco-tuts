    
function advancedSearch(req, res){
  console.log(req.body);
  let userParams = req.body;
  let query = '';
  let querySelect = 'select ';
  let queryFrom = 'from ';
  let queryJoin = 'join ';
  let queryOn = 'on ';
  let queryWhere = 'where ';

  if (!!userParams['name']) {
    //query to find name
    console.log("sees name: ", userParams['name'])
    //need table: users
    let select1 = 'users.name ';
    let from1 = 'users ';
    let where1 = 'users.name=' + userParams['name'] + ' ';
    querySelect += select1;
    queryFrom += from1;
    queryWhere += where1;

  }
  if (!!userParams['subject']) {
    //query to find subject
    console.log("sees subject: ", userParams['subject'])
    //need table: teaching where subjectID = thesubjectid and userID=theuserid
    let select2 = 'subject.name ';
    let from2 = 'subjects ';
    let where2 = 'subjects.name=' + userParams['subject'] + ' ';
    querySelect += select2;
    queryFrom += from2;
    queryWhere += where2;
  }
  if (!!userParams['rating']) {
    //query to find rating
    console.log("sees rating: ", userParams['rating'])
    //need table: teachers
    let select3 = 'subject.name ';
    let from3 = 'teaching ';
    let where3 = 'subjects.name=' + userParams['subject'];
    querySelect += select3;
    
    queryWhere += where3;
  }
  if (!!userParams['currentlyAvailable']) {
    //query to find currentlyAvailable
    console.log("sees currentlyAvailable: ", userParams['currentlyAvailable'])
    //need table: teachers
    let select4 = 'subject.name ';
    let from4 = queryFrom.indexOf('teaching') > -1 ? '' : 'teaching ';
    let where4 = 'subjects.name=' + userParams['subject'];
    querySelect += select4;
    queryFrom += from4;
    queryWhere += where4;
  }

  query += querySelect + queryJoin + queryFrom + queryOn +  queryWhere;
  console.log("QUERY: ", query);


  db.any(query)
    .then(respondWithData(res, "Retrieved results from advanced search"))
    .catch(catchError(next));
}

module.exports = {
  advancedSearch: advancedSearch
}