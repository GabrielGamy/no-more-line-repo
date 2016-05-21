"use strict";

var express = require('express');

var router = express.Router();
var app = express();

router.route('/customers')
    .post(function (req, res) {
        console.log(req.body);
        if(req.body){
            
        }else{
            res.status(400);   
            res.send({"error":"err"}); 
        }
        
        res.send("cool");
    }
);

module.exports = router;