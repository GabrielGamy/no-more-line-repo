"use strict";

var express = require('express');
var router = express.Router();
 
var utilApp = require("../../services/utilApp");
var hateoas = require("../../services/hateoasLinks").hateoas;
var jwt = require("jsonwebtoken");
var envConfig = require("../../config/env");

var customerModel = require("../../models/customers");
var Customer = customerModel.Customer;

router.post('/signin', beforeAuthenticatingUser, function (req, res, next) {

    var error = new Error("Incorrect email / password");
    error.status = 400;

    Customer.findOne({email: req.body.email}, function(err, customer){
        
        if(err) throw err; // unexpected error

        if(!customer){
            next(error); // middleware to catch request error
        }else{
            // check if password matched
            if(utilApp.compareHash(req.body.password, customer.password)){
                // if everything is ok
                req.customer = customer;
                next(); // create a  token for the user
            }else{
                next(error); // middleware to catch request error         
            }
        }
    });
}, generateToken);

// Just for test. It must be removed afterward
router.get("/auth", utilApp.requireValidToken, function(req, res){
    res.send({success: true, message: "Yeah valid token", decoded: req.decoded});
});

// ================
// middleware to validate request body before before authenticating an customer ======
// ================
function beforeAuthenticatingUser (req, res, next){

    var error = new Error("Invalid body for authenticating an user");

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
    // if user is found and password is right
    // create a token
    var token = jwt.sign({user_id: req.customer._id}, envConfig.SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });

    // return the response including token 
    var message = {
        welcome: 'Welcome ' + req.customer.first_name,
        token: token
    }
    res.status(200);    
    res.send(utilApp.response(true, message , hateoas.link("customers_signin",{_id: req.customer._id})));  
    
}
module.exports = router;