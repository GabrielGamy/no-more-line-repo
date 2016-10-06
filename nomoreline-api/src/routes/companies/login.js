"use strict"

var express = require('express');
var router = express.Router();

var geocoder = require('geocoder');

var srcFolder = "../../";

var utilApp = require(srcFolder + "services/utilApp");
var hateoas = require(srcFolder + "services/hateoasLinks").hateoas;

var dbClient = require(srcFolder + "services/elasticSearch");
var CompanyValidator = require(srcFolder + "models/company/validator").CompanyValidator;
var envConfig = require(srcFolder + "config/env");

var googleMapsClient = envConfig.GOOGLE_MAPS_CLIENT;

router.get("/login",function(req,res){
    res.status(200);
    res.send(utilApp.response(true, "Request successfully completed", hateoas.link("companies_login",{})));  
});

router.post("/signup", 
    beforeCreatingCompany, 
    isUniqueCompany,
    getCompanyCoordinates, 
    function(req, res, next) {
        req.body.password = utilApp.generateHash(req.body.password);
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


// ================
// middleware to verify is the company is unique using the DAO
// ================
function isUniqueCompany(req,res,next){

    var searchBody = [
        // Looking if the company name already exists
        {index : envConfig.ELASTIC_SEARCH_NODE_NAME, type : "company"},
        {
            query :{
               match_phrase : {
                   company_name: req.body.company_name 
               } 
            }
        },
        // Looking if the email is already exists the, {} means we ll search for the query in all indexes 
        {},  
        {
            query:{
                match_phrase :{
                    email : req.body.email 
                }
            }
        } 
        
    ]
    dbClient.msearch({body: searchBody},function(error,response){
        if(error){
            next(error);
        }else{
            
            var total = response.responses[0].hits.total + response.responses[1].hits.total;
            if(total == 0){
                next();
            }else {
                error = new Error("Company already exists !");
                error.status = 400;
                next(error);
            }         
       }
    });

}

function getCompanyCoordinates(req, res, next){
    
    var address = req.body.location + ", " + req.body.city + ", " + req.body.postal_code + ", " + req.body.country;
    
    // Geocode an address.
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
 
        if(err){
            next(err);
        }else {
            var geolocationInformations = response.json || {};

            if(geolocationInformations.status === "OK" && geolocationInformations.results.length > 0){
                
                req.body.company_geolocation_infos = {
                    formatted_address: geolocationInformations.results[0].formatted_address,
                    place_id: geolocationInformations.results[0].place_id,
                    location: {
                        lat: geolocationInformations.results[0].geometry.location.lat,
                        lon: geolocationInformations.results[0].geometry.location.lng
                    }
                };
 
                next();
            }else {
                var error = new Error("Unable to get the coordinates. Please verify your address informations !");
                error.status = 400;
                next(error);
            }    
        }     
    });    
}

module.exports = router;