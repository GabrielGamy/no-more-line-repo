"use strict";

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var utilApp = require("./services/utilApp");
var hateoas = require("./services/hateoasLinks").hateoas;

var index = require('./routes/index');
var authentication = require('./routes/authentication');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(400).send(utilApp.response(false,"Bad request",hateoas.link("error",{})));
});

app.use('/',index);
app.use('/',authentication);


app.use(function(req, res, next){
	res.status(404).send(utilApp.response(false,"Ressource Not Found",hateoas.link("error",{})));
});

app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});


