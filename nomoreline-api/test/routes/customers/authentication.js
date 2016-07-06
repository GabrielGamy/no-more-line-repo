"use strict";

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");

var mock = require("./mocks/mock-authentication");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;

var request = supertest.agent(serverUrl);

describe("Customers",function(){
    describe("POST /signin",function () {
        it("Bad Request: a request body is empty",function (done) {
            request
            .post('/customers/signin')
            .send(mock.customer_with_empty_body)
            .end(function(err,res){
                res.status.should.equal(501);
                res.body.message.should.equal("Not Implemented");
                done();
            });       
        });           
    });
});