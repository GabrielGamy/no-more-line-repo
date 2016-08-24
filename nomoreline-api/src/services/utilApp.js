"use strict";

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var envConfig = require("../config/env");

// create the body for the response object which will send to the client
exports.response = function (success, message, hateoas) {
  var data = {
    success: success,
    message: message,
    hateoas: hateoas 
  };
  return data;
}

exports.createLogs = function (message, error, received_ata) {
  var result = {
    _date : new Date(), // Current Date
    _message: message,
    _error: error,
    _received_ata: received_ata
  };
  console.log("Error infos:" + JSON.stringify(result, null , 4));
}

exports.arrayContains = function (array, value) {
  return array.indexOf(value) != -1;
}

exports.generateHash = function (value){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
}

exports.compareHash = function (value, hash){
    return bcrypt.compareSync(value, hash);
}

exports.getMissingFields = function (errors){
    var missingFields = Object.keys(errors);
    var errorMessages = [];

    missingFields.forEach(function(field){
        errorMessages.push(errors[field].message);
    });
    return errorMessages;
}

// ================
// middleware to verify a token
// ================
exports.requireValidToken = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {

        // verifies secret 
        jwt.verify(token, envConfig.SECRET, function(err, decoded) {      
            if (err) {
                var error = new Error('Failed to authenticate token.');
                error.status = 400;
                next(error);                
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        var error = new Error('No token provided.');
        error.status = 403;
        next(error);
    }
}
