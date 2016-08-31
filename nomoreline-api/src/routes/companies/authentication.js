"use strict";

var express = require('express');
var router = express.Router();

var srcFolder = "../../";

var utilApp = require(srcFolder + "services/utilApp");
var jwt = require("jsonwebtoken");
var hateoas = require(srcFolder + "services/hateoasLinks").hateoas;

var dbClient = require(srcFolder + "services/elasticSearch");
var CompanyValidator = require(srcFolder + "models/company/validator").CompanyValidator;
var envConfig = require(srcFolder + "config/env");

router.post('/signin', beforeAuthenticatingCompany, function (req, res, next) {

    var data = [
        // Looking for the company email
        {index : envConfig.ELASTIC_SEARCH_NODE_NAME, type : "company"},
        {query :{ match_phrase : { email: req.body.email }}},
    ]
    
    dbClient.search(data, function(err, response){
        if(err){
            var error = new Error("Server error");
            error.status = 500;
            next(error);
        }else{
            var hits = response.responses[0].hits;
            var isFound = hits.total != 0;

            if(isFound){

                var password = hits.hits[0]._source.password;

                if(utilApp.compareHash(req.body.password,password)){
                    req.company = {
                        _id: hits.hits[0]._id, 
                        company_name:hits.hits[0]._source.company_name
                    }
                    next();              
                }else{
                    var error = new Error("Incorrect email / password");
                    error.status = 400;
                    next(error);                
                }             
            }else{
                var error = new Error("Incorrect email / password");
                error.status = 400;
                next(error);
            }
       }
    });
}, generateToken);

// ================
// middleware to validate request body before before authenticating a company ======
// ================
function beforeAuthenticatingCompany (req, res, next){

    var error = new Error("Invalid body for authenticating the company");

    if(req.body){

        if(!req.body.email || !req.body.password){
            error.message = "Email and Password must be provided";
            error.status = 400;
            next(error); // middleware to catch request error
        }else{
            next();
        }

    }else{
        error.status = 400;
        next(error); // middleware to catch request error
    }
}

function generateToken (req, res, next) {
    // if company is found and password is right
    // create a token
    var token = jwt.sign({company_id: req.company._id}, envConfig.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });

    // return the response including token 
    var message = {
        welcome: 'Welcome ' + req.company.company_name,
        token: token
    }
    res.status(200);    
    res.send(utilApp.response(true, message , hateoas.link("companies_signin",{_id: req.company._id})));  
}
module.exports = router;