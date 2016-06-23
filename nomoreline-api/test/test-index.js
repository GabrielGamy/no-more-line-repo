"use strict";

var supertest = require("supertest");
var should = require("should");

var serverUrl = require("../src/services/utilApp").getBaseUrl();

var request = supertest.agent(serverUrl);

describe("Home page",function(){
    
    it("should load the home page properly",function (done) {
        request
        .get('/')
        .end(function(err,res){
            res.status.should.equal(200);
            done();
        });       
    });
});