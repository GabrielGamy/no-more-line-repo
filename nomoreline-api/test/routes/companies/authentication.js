"use strict";

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");

var mock = require("./mocks/mock-authentication");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;

var request = supertest.agent(serverUrl);

describe("Companies",function(){
    describe("POST /signin",function () {
        before("Before making the authentication we need to create a new company",function(done){
            request
            .post('/Companies/signup')
            .send(mock.company_with_a_valid_body)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.success.should.equal(true);
                res.body.message.should.equal("Account successfully created");
                done();
            });
        });
        after("After all tests: remove the company created",function(done){
            console.log("Attention: Definir le DELETE company pour supprimer la compagnie".red);
            done();
        });       
        it("Success: company is an existing company",function(done){
            request
            .post('/Companies/signin')
            .send({
                email: mock.company_with_a_valid_body.email,
                password: mock.company_with_a_valid_body.password
            })
            .end(function(err,res){
                var message = res.body.message;

                res.status.should.equal(200);
                res.body.success.should.equal(true);
                message.welcome.should.equal('Welcome ' + mock.company_with_a_valid_body.company_name.toLowerCase());
                message.should.have.property('token');

                done();
            });
        });        
        it("Error: the body is null",function (done) {
            request
            .post('/companies/signin')
            .send(null)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.message.should.equal("Email and Password must be provided");
                done();
            });       
        });        
        it("Error: company with empty body",function (done) {
            request
            .post('/companies/signin')
            .send(mock.company_with_empty_body)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.message.should.equal("Email and Password must be provided");
                done();
            });       
        });
        it("Error: company is not an existing company",function(done){
            request
            .post('/companies/signin')
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
        it("Error: company with a an existing email but password does not matched",function(done){
            request
            .post('/companies/signin')
            .send({
                email: mock.company_with_a_valid_body.email,
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
        it("Error: company with a an existing password but inexisting email",function(done){
            request
            .post('/companies/signin')
            .send({
                email: "patate@gmail.com",
                password: mock.company_with_a_valid_body.password
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