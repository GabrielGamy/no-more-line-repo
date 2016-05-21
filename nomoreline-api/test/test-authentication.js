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
                .send(mock.badCustomer1)
                .end(function(err,res){
                    res.status.should.equal(400);
                    res.body.message.should.equal('Bad request');
                    done();
                });       
            });                    
        });
        
        describe("Company",function() {
            
        });           
    });
});