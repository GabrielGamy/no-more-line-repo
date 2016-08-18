"use strict"

var express = require('express');
var router = express.Router();

var utilApp = require("../../services/utilApp");
var hateoas = require("../../services/hateoasLinks").hateoas;

var dbClient = require("../../services/elasticSearch");
var CompanyValidator = require("../../models/company/validator").CompanyValidator;

router.get("/login",function(req,res){
    res.status(200);
    res.send(utilApp.response(true, "Request successfully completed", hateoas.link("companies_login",{})));  
});

router.post("/signup", beforeCreatingCompany, function(req, res, next) {
    dbClient.create("company", req.body, function(error, response){
        if(error){
            next(error);
        }else{
            res.status(201);
            res.send(utilApp.response(true,"Account successfully created", hateoas.link("companies_signup",{})));    
        }
    });
});

// ================
// middleware to validate request body before creating a new company ======
// ================
function beforeCreatingCompany (req, res, next){

    var error = new Error("Invalid body for creating a new company");

    if(req.body){
        var newCompany = new CompanyValidator(req.body);

        newCompany.validate(function(err){
            if(err){
                error.status = 400;
                error.message = utilApp.getMissingFields(err.errors);
                next(error); // middleware to catch request error                
            }else{
                req.body = newCompany;
                next();
            }
        });
    }else{
        error.status = 400;
        next(error);
    }
}

module.exports = router;