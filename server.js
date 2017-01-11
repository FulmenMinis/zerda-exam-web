'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ep1337",
  database: ""
});

con.connect(function(err){
  if(err){
    console.log("Error connecting to Db", err);
    return;
  }
  console.log("Connection established");
});

var app = express();
app.use(bodyParser.json());
app.use(express.static('client'));
