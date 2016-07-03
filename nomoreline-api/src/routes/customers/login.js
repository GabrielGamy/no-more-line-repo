"use strict"

var express = require('express');
var router = express.Router();

var utilApp = require("../../services/utilApp");
var hateoas = require("../../services/hateoasLinks").hateoas;

router.get("/login",function(req,res){
    res.status(200);
    res.send(utilApp.response(true, "Request successfully completed", hateoas.link("customers_login",{})));  
});

router.post("/signup",function(req,res) {
    res.status(501);
    res.send(utilApp.response(false, "Not Implemented", hateoas.link("error",{})));     
});

module.exports = router;