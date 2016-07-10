"use strict";

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");

var mock = require("./mocks/mock-authentication");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;

var request = supertest.agent(serverUrl);

describe("Customers",function(){
    describe("POST /signin",function () {
        before("Before making the authentication we need to create a new customer",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_valid_a_body)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.success.should.equal(true);
                res.body.message.should.equal("Account successfully created");
                done();
            });
        });
        after("After all tests: remove the customer created",function(done){
            console.log("Attention: Definir le DELETE customer pour supprimer le client".red);
            done();
        });       
        it("Success: customer is an existing user",function(done){
            request
            .post('/customers/signin')
            .send({
                email: mock.customer_with_valid_a_body.email,
                password: mock.customer_with_valid_a_body.password
            })
            .end(function(err,res){
                var message = res.body.message;

                res.status.should.equal(200);
                res.body.success.should.equal(true);
                message.welcome.should.equal('Welcome ' + mock.customer_with_valid_a_body.first_name);
                message.should.have.property('token');
                done();
            });
        });        
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
        it("Error: customer is not an existing user",function(done){
            request
            .post('/customers/signin')
            .send({
                email: "patate@gmail.com",
                password: "patate"
            })
            .end(function(err,res){
                var message = res.body.message;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                message.should.equal("Incorrect email / password");
                
                done();
            });
        });
        it("Error: customer with a an existing email but password does not matched",function(done){
            request
            .post('/customers/signin')
            .send({
                email: mock.customer_with_valid_a_body.email,
                password: "patate"
            })
            .end(function(err,res){
                var message = res.body.message;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                message.should.equal("Incorrect email / password");
                
                done();
            });
        });
        it("Error: customer with a an existing password but inexisting email",function(done){
            request
            .post('/customers/signin')
            .send({
                email: "patate@gmail.com",
                password: mock.customer_with_valid_a_body.password
            })
            .end(function(err,res){
                var message = res.body.message;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                message.should.equal("Incorrect email / password");
                
                done();
            });
        });                                   
    });
});