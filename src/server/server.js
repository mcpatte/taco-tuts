//require the modules that we need
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

//initialize the app as an express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist'));

app.listen(PORT, function() {
  console.log("So many tacos here on 3000");
});

module.exports = app;
