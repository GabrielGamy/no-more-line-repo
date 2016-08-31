"use strict"

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");
require("colors");

var mock = require("./mocks/mock-login");
var utilApp = require(srcFolder + "/services/utilApp");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;
var request = supertest.agent(serverUrl);

describe("companies",function(){
    describe("GET /login",function(){
        it("Get the Company login page",function(done){
            request
            .get("/companies/login")
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.message.should.equal("Request successfully completed");
                done();
            });
        });
    });
    
    describe("POST /signup",function(){
        it("Sucess: Should create a valid company with all required fields",function(done){
            request
            .post("/companies/signup")
            .send(mock.a_valid_company)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.message.should.equal("Account successfully created");
                done();
            });
        });

        //it()
    });
    
})
