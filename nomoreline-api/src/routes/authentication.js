"use strict";

var express = require('express');
var router = express.Router();

var utilApp = require("../services/utilApp");
var hateoas = require("../services/hateoasLinks").hateoas;

router.route('/customers')
  .post(function (req, res) {
    res.status(501).send(utilApp.response(false,"Not Implemented",hateoas.link("error",{})));
  }
);

module.exports = router;