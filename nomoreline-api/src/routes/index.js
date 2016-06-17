"use strict";

var express = require('express');

var router = express.Router();
var app = express();

var utilApp = require("../services/utilApp");

router.route('/')
    .get(function (req, res) {

      res.status(200);
      res.send(utilApp.response(res.statusCode,'WELCOME TO NOMORELINE HATEOAS REST API',{}));
});

module.exports = router;