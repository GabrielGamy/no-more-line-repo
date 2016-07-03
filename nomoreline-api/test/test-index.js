"use strict";

var supertest = require("supertest");
var should = require("should");

var serverUrl = require("../src/config/env").BASE_URL;

var request = supertest.agent(serverUrl);

describe("Home",function(){
    describe("GET /",function(){
        it("should get the home naviagation object properly",function (done) {
            request
            .get('/')
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.message.should.equal("WELCOME TO NOMORELINE HATEOAS REST API");
                done();
            });       
        });        
    });
});