'use strict'

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");
require("colors");

var mock = require("./mocks/mock-login");
var utilApp = require(srcFolder + "/services/utilApp");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;
var request = supertest.agent(serverUrl);

var minLen = 8, maxLen = 32;

describe("Customers",function(){
    describe("GET /login",function(){
        it("should get the login naviagation object properly",function(done){
            request
            .get("/customers/login")
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.message.should.equal("Request successfully completed");
                done();
            });
        });
    });   

    describe("POST /signup",function(){
        after("After all tests: remove the customer created",function(done){
            console.log("Attention: Definir le DELETE customer pour supprimer le client et enlever les skip".red);
            done();
        });
        it.skip("Success: customer with valid a body",function(done){
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
        it("Error: customer with empty body",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_empty_body)
            .end(function(err,res){
                var errors = res.body.message;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                utilApp.arrayContains(errors, 'The last name is required').should.equal(true);
                utilApp.arrayContains(errors, 'The first name is required').should.equal(true);
                utilApp.arrayContains(errors, 'The email is required').should.equal(true);
                utilApp.arrayContains(errors, 'The password is required').should.equal(true);
                utilApp.arrayContains(errors, 'The phone number is required').should.equal(true);
                done();
            });
        });
        it("Error: customer with fields that contain only spaces",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_empty_body)
            .end(function(err,res){
                var errors = res.body.message;
                
                errors.length.should.equal(5);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                utilApp.arrayContains(errors, 'The last name is required').should.equal(true);
                utilApp.arrayContains(errors, 'The first name is required').should.equal(true);
                utilApp.arrayContains(errors, 'The email is required').should.equal(true);
                utilApp.arrayContains(errors, 'The password is required').should.equal(true);
                utilApp.arrayContains(errors, 'The phone number is required').should.equal(true);

                done();
            });
        });        
        it("Error: customer with fields that exceed the maximum length",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_fields_that_exceed_the_maximum_length)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(6);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                utilApp.arrayContains(errors, "The last name must be less than " + maxLen + " caracters").should.equal(true);
                utilApp.arrayContains(errors, "The first name must be less than " + maxLen + " caracters").should.equal(true);
                utilApp.arrayContains(errors, "The email must be less than " + maxLen + " caracters").should.equal(true);
                utilApp.arrayContains(errors, "Password must be less than " + maxLen + " caracters").should.equal(true);
                utilApp.arrayContains(errors, "Address must be less than " + maxLen + " caracters").should.equal(true);

                done();
            });
        });
        it("Error: 1- customer with invalid email format",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_invalid_email_format_1)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Invalid email format");

                done();
            });
        });
        it("Error: 2- customer with invalid email format",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_invalid_email_format_2)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Invalid email format");

                done();
            });
        });
        it("Error: customer with too short password",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_too_short_password)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must be " + minLen + " caracters or more");

                done();
            });
        }); 
        it("Error: customer with password that does not contains a capital letter",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_password_that_does_not_contains_a_capital_letter)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");

                done();
            });
        });
        it("Error: customer with password that does not contains a lowercase letter",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_password_that_does_not_contains_a_lowercase_letter)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");

                done();
            });
        }); 
        it("Error: customer with password that does not contains a number",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_password_that_does_not_contains_a_number)
            .end(function(err,res){
                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");

                done();
            });
        });
        it("Error: customer with invalid phone number format",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_invalid_phone_number_format)
            .end(function(err,res){
                var errors = res.body.message;
                var phoneNumber = mock.customer_with_invalid_phone_number_format.phone;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal(phoneNumber + ' is not a valid phone number!');

                done();
            });
        });
        it("Error: customer with invalid postal code format",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_invalid_postal_code_format)
            .end(function(err,res){
                var errors = res.body.message;
                var postalCode = mock.customer_with_invalid_postal_code_format.postal_code;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal(postalCode + ' is not a valid postal code!');

                done();
            });
        });         
        it.skip("Error: customer with email that is already taken",function(done){
            request
            .post('/customers/signup')
            .send(mock.customer_with_valid_a_body)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.success.should.equal(false);
                res.body.message.should.equal("That email is already taken, please try another");
                done();
            });
        });                                                                         
    });
});


