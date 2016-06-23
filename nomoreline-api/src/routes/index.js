"use strict";

var express = require('express');

var router = express.Router();
var app = express();

var utilApp = require("../services/utilApp");
var hateoas = require("../services/hateoasLinks").hateoas;

router.route('/')
  .get(function (req, res) {

    res.status(200);
    res.send(utilApp.response(true,'WELCOME TO NOMORELINE HATEOAS REST API', hateoas.link("root",{})));
});

module.exports = router;