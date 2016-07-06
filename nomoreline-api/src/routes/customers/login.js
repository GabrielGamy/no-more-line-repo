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

router.post("/signup",function(req,res) {

    /*var customer = new Customer ({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        postal_code: req.body.postal_code                       
    });
            
    customer.save(function (err) {
        if(err){
            var error_msg = "Something bad happened! Please try again";
            if(err.code == 11000){
                error_msg = "That email is already taken, please try another" ;
            }
            
            res.status(400);
            util.create_logs(req.body, error_msg, err);
            res.send(util.send_response(res.statusCode,error_msg,err));                                            
        }else{
            res.status(201);
            res.send(util.send_response(res.statusCode,"Account successfully created",""));                            
        }
    });*/
        
    res.status(501);
    res.send(utilApp.response(false, "Not Implemented", hateoas.link("error",{})));     
});

module.exports = router;