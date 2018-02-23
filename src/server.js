//server.js

//import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//and create out instances
var app = express();
var router = express.Router();

//set our port
var port = 46357

//this pareses for data in the json
// app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect('mongdb://software1:hunter2@ds046357.mlab.com:46357/software-engineering-db')