//require the modules that we need
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

//initialize the app as an express app
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist'));

app.listen(3000);
console.log("So many tacos here on 3000");

module.exports = app;