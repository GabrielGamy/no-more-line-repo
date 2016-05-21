"use strict";

var express = require('express');

var router = express.Router();
var customersValidations = require("../services/customer/validation");
var util = require("../services/util");

router.route('/customers')
    .post(function (req, res) {
        if(customersValidations.is_a_valid_customer_data(req.body)){
            res.status(200);
            res.send("cool");         
        }else{
            res.status(400);
            var message = "Bad request";
            var fields = "invalid body";   
            res.send(util.send_error(res.statusCode,message,fields)); 
        }
    }
);

module.exports = router;