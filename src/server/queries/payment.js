var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData
var stripe = require("stripe")("sk_test_KG0NAu7nQPz1CBsEXGRzWAie");


function postToken(req, res, next) {
  var token = req.body.id;
  var price = req.body.amount;
  console.log("token from server", token)
  var charge = stripe.charges.create({
    amount: price,
    currency: "usd",
    source: token
  }, 
  function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log("The card has been declined")
    }
  })
  .then(respondWithData(res, 'payment successful'))
  .catch(catchError(next));
}


module.exports = {
    postToken: postToken
}