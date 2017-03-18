var express = require('express');
var router = express.Router();

var dbClient = require("../services/elasticSearch");

router.post('/companies',function(req, res, next){
    var modelObject = require('../models/company/model').CompanyModel;

    dbClient.putMapping('company', modelObject, function(error, response){
        if(error){
            next(error);
        }else{
            res.status(200);
            res.send({success: true, message: response});
        }
    });
});

module.exports = router;