"use strict";

var express = require('express');
var router = express.Router();

var utilApp = require("../services/utilApp");

router.route('/customers')
    .post(function (req, res) {
		res.status(501).send(utilApp.response(res.statusCode,"Not Implemented",{}));
    }
);

module.exports = router;