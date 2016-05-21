"use strict";

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var index = require('./routes/index');
var authentication = require('./routes/authentication');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/',authentication);

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});


