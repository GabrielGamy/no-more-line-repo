var express = require('express');
var router = express.Router();

var putMapping = require("../services/elasticSearch").putMapping;
var indexName = 'nomoreline_app_node_1';

router.post('/companies',function(req, res, next){
    var typeName = "companies";
    var modelObject = require('../models/company/model').CompanyModel;

    putMapping(indexName, typeName, modelObject, function(error, response){
        if(error){
            next(error);
        }else{
            res.status(200);
            res.send({success: true, message: response});
        }
    });
});

module.exports = router;