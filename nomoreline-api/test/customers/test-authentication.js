"use strict";

var supertest = require("supertest");
var should = require("should");

var mock = require("./mocks/mock-authentication");
var serverUrl = require("../../src/services/utilApp").getBaseUrl();

var request = supertest.agent(serverUrl);

describe("Authentication",function(){
    describe("Sign up",function () {
        describe("Customers",function() {
            it("Bad Request: a request body is empty",function (done) {
                request
                .post('/customers')
                .send(mock.customer_with_empty_body)
                .end(function(err,res){
                    res.status.should.equal(501);
                    res.body.message.should.equal("Not Implemented");
                    done();
                });       
            });                    
        });
        
        describe("Company",function() {
            
        });           
    });
});