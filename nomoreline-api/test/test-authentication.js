"use strict";

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5000");
var mock = require("./mockObjects");

describe("Authentication",function(){
    describe("Sign up",function () {
        describe("Customers",function() {
            it("Bad Request: a request body is empty",function (done) {
                server
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