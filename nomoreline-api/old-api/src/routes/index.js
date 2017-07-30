"use strict";

var express = require('express');
var router = express.Router();

var utilApp = require("../services/utilApp");
var hateoas = require("../services/hateoasLinks").hateoas;

router.get("/", function (req, res) {
    res.status(200);
    res.send(utilApp.response(true,'WELCOME TO NOMORELINE HATEOAS REST API', hateoas.link("home",{})));
});

module.exports = router;