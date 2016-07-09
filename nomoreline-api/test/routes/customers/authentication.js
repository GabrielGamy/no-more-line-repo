"use strict";

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");

var mock = require("./mocks/mock-authentication");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;

var request = supertest.agent(serverUrl);

describe("Customers",function(){
    describe("POST /signin",function () {
        it("Error: the body is null",function (done) {
            request
            .post('/customers/signin')
            .send(null)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.message.should.equal("Email and Password must be provided");
                done();
            });       
        });        
        it("Error: customer with empty body",function (done) {
            request
            .post('/customers/signin')
            .send(mock.customer_with_empty_body)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.message.should.equal("Email and Password must be provided");
                done();
            });       
        });           
    });
});