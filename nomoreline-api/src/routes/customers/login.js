"use strict"

var express = require('express');
var router = express.Router();

var utilApp = require("../../services/utilApp");
var hateoas = require("../../services/hateoasLinks").hateoas;

var customerModel = require("../../models/customers");
var Customer = customerModel.Customer;

router.get("/login",function(req,res){
    res.status(200);
    res.send(utilApp.response(true, "Request successfully completed", hateoas.link("customers_login",{})));  
});

router.post("/signup", beforeCreatingUser, function(req, res, next) {
    
    var newCustomer = req.newCustomer;
           
    newCustomer.save(function (err) {
        if(err){
            err.message = "Something bad happened! Please try again";
            err.status = 400;
            if(err.code == 11000){
                err.message = "That email is already taken, please try another" ;
            }
            next(err); // middleware to catch request error
        }else{
            res.status(201);
            res.send(utilApp.response(true,"Account successfully created", hateoas.link("customers_signup",{})));                            
        }
    });    
});


// ================
// middleware to validate request body before creating an user ======
// ================
function beforeCreatingUser (req, res, next){

    var error = new Error("Invalid body for creating a new user");

    if(req.body){
            
        var newCustomer = new Customer(req.body);

        newCustomer.validate(function(err){
            if(err){
                error.status = 400;
                error.message = getMissingFields(err.errors);
                next(error); // middleware to catch request error
            }else{
                req.newCustomer = newCustomer;
                next();
            }
        });

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