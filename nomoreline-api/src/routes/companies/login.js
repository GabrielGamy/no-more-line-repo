"use strict"

var express = require('express');
var router = express.Router();

var utilApp = require("../../services/utilApp");
var hateoas = require("../../services/hateoasLinks").hateoas;

router.get("/login",function(req,res){
    res.status(200);
    res.send(utilApp.response(true, "Request successfully completed", hateoas.link("companies_login",{})));  
});

router.post("/signup", beforeCreatingCompany, function(req, res, next) {
    res.status(201);
    res.send(utilApp.response(true,"Account successfully created", hateoas.link("companies_signup",{})));    
});

// ================
// middleware to validate request body before creating a new company ======
// ================
function beforeCreatingCompany (req, res, next){

    var error = new Error("Invalid body for creating a new company");

    if(req.body){
     
        next();
    }else{
        error.status = 400;
        next(error);
    }
}

function getMissingFields(errors){
    var missingFields = Object.keys(errors);
    var errorMessages = [];

    missingFields.forEach(function(field){
        errorMessages.push(errors[field].message);
    });
    return errorMessages;
}

module.exports = router;