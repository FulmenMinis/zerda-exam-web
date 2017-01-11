'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ep1337',
  database: 'secretprojects',
});

connection.connect(function connectMsql(error) {
  if (error) {
    console.log('Failed!', error);
  } else {
    console.log('Success!');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.use(function use(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Server running on port %d', port);
});
