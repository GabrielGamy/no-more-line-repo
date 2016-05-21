"use strict";

var express = require('express');

var router = express.Router();
var app = express();

router.route('/')
    .get(function (req, res) {

      res.status(200);
      res.render('pages/index');
});

module.exports = router;