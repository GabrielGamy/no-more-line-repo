"use strict";

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

// ================
// custom services ======
// ================
var utilApp = require("./services/utilApp");
var hateoas = require("./services/hateoasLinks").hateoas;

// ================
// global routes ======
// ================
var index = require('./routes/index');

// ================
// customers routes ======
// ================
var customers_authentication = require('./routes/customers/authentication');
var customers_login = require('./routes/customers/login');

// ================
// config ======
// ================
var envConfig = require("./config/env");
var databaseConnection = require("./config/database");

app.set('port', envConfig.PORT);

// connect to database
app.use(databaseConnection.getConnection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// ================
// middleware to catch request error ======
// ================
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(400).send(utilApp.response(false,"Bad request",hateoas.link("error",{})));
});

// ================
// api routes ======
// ================
app.use('/',index);
app.use('/customers',customers_authentication);
app.use('/customers',customers_login);

// ================
// middleware to catch 404 error ======
// ================
app.use(function(req, res, next){
	res.status(404).send(utilApp.response(false,"Ressource Not Found",hateoas.link("error",{})));
});

// ================
// server start ======
// ================
app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});