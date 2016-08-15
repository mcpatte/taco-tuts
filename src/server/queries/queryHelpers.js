var respondWithData = function(res, message) {
  return function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: message
      });
  }
};

var postData = function(res, message){
  return function(){
    res.status(200)
      .json({
        status: 'success',
        message: message
      });
  }
};

var catchError = function(next){
  return function(err){
    console.error(err);
    return next(err);
  };
};

module.exports = {
  respondWithData: respondWithData,
  postData: postData,
  catchError: catchError
}
