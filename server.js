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

var praise = ["amazing", "awesome", "blithesome", "excellent", "fabulous", "fantastic", "favorable", "fortuitous", "great", "incredible", "ineffable", "mirthful", "outstanding", "perfect", "propitious", "remarkable", "smart", "spectacular", "splendid", "stellar", "stupendous", "super", "ultimate", "unbelievable", "wondrous"];

var validator = function (req) {
  let text = req.body.feedback;
  let scale = parseInt(req.body.scale);
  let email = req.body.email;

  if (email.indexOf != -1  && scale >= 10) {
    return true;
  } else {
    return false;
  };
};

module.exports = validator;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.use(function use(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

app.post('/exam', function(req, res) {
  console.log(req.body);
  console.log(validator(req));
  if (validator(req) == true) {
    connection.query({
      sql: 'SELECT project_name FROM projects'},
      function sendBackProjects(err, rows) {
        console.log(rows);
      if (err) {
        console.log(err.toString());
        return;
      }
      let content = rows.map(function (i) {
        return i.project_name;
      });
      console.log("yeah");
      res.send({"status": "ok", "projects": content});
      console.log({"status": "ok", "projects": content});
    });
  } else {
    res.send({"status": "error", "message": "thank you"});
  }

});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Server is killing it on port %d', port);
});
