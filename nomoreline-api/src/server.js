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
var customersAuthentication = require('./routes/customers/authentication');
var customersLogin = require('./routes/customers/login');

// ================
// companies routes ======
// ================
//var companiesAuthentication = require('./routes/companies/authentication');
var companiesLogin = require('./routes/companies/login');

// ================
// admin routes ======
// ================
var mappings = require('./routes/mappings');

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
// api routes ======
// ================
app.use('/',index);

app.use('/customers',customersAuthentication);
app.use('/customers',customersLogin);

app.use('/companies',companiesLogin);

app.use('/mappings', mappings);
// ================
// middleware to catch 404 error ======
// ================
app.use(function(req, res, next){
	res.status(404).send(utilApp.response(false,"Ressource Not Found",hateoas.link("error",{})));
});

// ================
// middleware to catch request error ======
// ================
app.use(function(err, req, res, next){
	res.status(err.status || 500);
    var message = res.statusCode !== 500 ? err.message : "Something bad happened! Please try again";
    res.send(utilApp.response(false, message, hateoas.link("error",{})));
    
    // log only unexpected errors 
    if(res.statusCode === 500) utilApp.createLogs(message, err.stack, req.body); 
});

// ================
// server start ======
// ================
app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});