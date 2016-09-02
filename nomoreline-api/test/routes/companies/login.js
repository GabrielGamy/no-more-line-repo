"use strict"

var srcFolder = '../../../src';

var supertest = require("supertest");
var should = require("should");
require("colors");

var mock = require("./mocks/mock-login");
var utilApp = require(srcFolder + "/services/utilApp");
var serverUrl = require(srcFolder + "/config/env").BASE_URL;
var request = supertest.agent(serverUrl);

var minLen = 8, maxLen = 200;

describe("Companies",function(){
    describe("GET /login",function(){
        it("should get the login naviagation object properly",function(done){
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
        after("After all tests: remove the company created",function(done){
            console.log("Attention: Definir le DELETE company pour supprimer la compagnie".red);
            done();
        });        
        it("Sucess: should create a valid company with all required fields",function(done){
            request
            .post("/companies/signup")
            .send(mock.a_valid_company)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.message.should.equal("Account successfully created");
                done();
            });
        });

        it("Error: company with an empty body",function(done){
            request
            .post("/companies/signup")
            .send(mock.fieldsless_company)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.success.should.equal(false);

                var errors = res.body.message;

                errors.length.should.equal(30);
                
                utilApp.arrayContains(errors, 'The name of the company is required').should.equal(true);
                utilApp.arrayContains(errors, 'The email of the company is required').should.equal(true);
                utilApp.arrayContains(errors, 'The password is required').should.equal(true);
                utilApp.arrayContains(errors, 'The continent is required').should.equal(true);
                utilApp.arrayContains(errors, 'The country is required').should.equal(true);
                utilApp.arrayContains(errors, 'The city is required').should.equal(true);
                utilApp.arrayContains(errors, 'The location is required').should.equal(true);
                utilApp.arrayContains(errors, 'The postal code is required').should.equal(true);
                utilApp.arrayContains(errors, 'The category is required').should.equal(true);
                utilApp.arrayContains(errors, 'The short description is required').should.equal(true);
                utilApp.arrayContains(errors, 'The services is required').should.equal(true);
                utilApp.arrayContains(errors, '[Monday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Monday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Tuesday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Tuesday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Wednesday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Wednesday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Thursday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Thursday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Friday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Friday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Saturday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Saturday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Sunday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Sunday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, 'The phone number is required').should.equal(true);
                utilApp.arrayContains(errors, 'Price.from (minimum price) is required').should.equal(true);
                utilApp.arrayContains(errors, "Price.to (minimum price) is required").should.equal(true);
                utilApp.arrayContains(errors, 'The name of the chief is required').should.equal(true);
                utilApp.arrayContains(errors, 'The company needs to have at least one picture').should.equal(true);

                done();
            });

        });

        it("Error: company with fields that contain only spaces",function(done){
            request
            .post('/companies/signup')
            .send(mock.company_with_fields_that_contain_only_spaces)
            .end(function(err,res){
                res.status.should.equal(400);
                res.body.success.should.equal(false);

                var errors = res.body.message;
                
                errors.length.should.equal(30);
                
                utilApp.arrayContains(errors, 'The name of the company is required').should.equal(true);
                utilApp.arrayContains(errors, 'The email of the company is required').should.equal(true);
                utilApp.arrayContains(errors, 'The password is required').should.equal(true);
                utilApp.arrayContains(errors, 'The continent is required').should.equal(true);
                utilApp.arrayContains(errors, 'The country is required').should.equal(true);
                utilApp.arrayContains(errors, 'The city is required').should.equal(true);
                utilApp.arrayContains(errors, 'The location is required').should.equal(true);
                utilApp.arrayContains(errors, 'The postal code is required').should.equal(true);
                utilApp.arrayContains(errors, 'The category is required').should.equal(true);
                utilApp.arrayContains(errors, 'The short description is required').should.equal(true);
                utilApp.arrayContains(errors, 'The services is required').should.equal(true);
                utilApp.arrayContains(errors, '[Monday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Monday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Tuesday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Tuesday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Wednesday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Wednesday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Thursday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Thursday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Friday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Friday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Saturday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Saturday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Sunday.opening_time] - The opening time is required').should.equal(true);
                utilApp.arrayContains(errors, '[Sunday.closing_time] - The closing time is required').should.equal(true);
                utilApp.arrayContains(errors, 'The phone number is required').should.equal(true);
                utilApp.arrayContains(errors, 'Price.from (minimum price) is required').should.equal(true);
                utilApp.arrayContains(errors, "Price.to (minimum price) is required").should.equal(true);
                utilApp.arrayContains(errors, 'The name of the chief is required').should.equal(true);
                utilApp.arrayContains(errors, 'The company needs to have at least one picture').should.equal(true);

                done();
            });
        }); 

        it.skip("Error: company with fields that exceed the maximum length",function(done){

            request
            .post('/companies/signup')
            .send(mock.company_with_fields_that_exceed_the_maximum_length)
            .end(function(err,res){
                var errors = res.body;

                //errors.length.should.equal(6);

                console.log(errors);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                //utilApp.arrayContains(errors, "The last name must be less than " + maxLen + " caracters").should.equal(true);
                //utilApp.arrayContains(errors, "The first name must be less than " + maxLen + " caracters").should.equal(true);
                //utilApp.arrayContains(errors, "The email must be less than " + maxLen * 2 + " caracters").should.equal(true);
                //utilApp.arrayContains(errors, "Password must be less than " + maxLen * 4 + " caracters").should.equal(true);
                //utilApp.arrayContains(errors, "Address must be less than " + maxLen + " caracters").should.equal(true);

                done();
            });
        }); 

        it("Error: 1- company with invalid email format",function(done){
            
            var theValidEmail = mock.a_valid_company.email;
            mock.a_valid_company.email = "company.email.com";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){
                
                mock.a_valid_company.email = theValidEmail;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Invalid email format");

                done();
            });
        });
        it("Error: 2- company with invalid email format",function(done){
            var theValidEmail = mock.a_valid_company.email;
            mock.a_valid_company.email = "company.email@gmailcom";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.email = theValidEmail;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Invalid email format");

                done();
            });
        });
        it("Error: company with too short password",function(done){

            var theValidPassword = mock.a_valid_company.password;
            mock.a_valid_company.password = "Compan1";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.password = theValidPassword;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must be " + minLen + " caracters or more");

                done();
            });
        }); 
        it("Error: customer with password that does not contains a capital letter",function(done){
            
            var theValidPassword = mock.a_valid_company.password;
            mock.a_valid_company.password = "company1";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.password =  theValidPassword;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");

                done();
            });
        });
        it("Error: company with password that does not contains a lowercase letter",function(done){
            var theValidPassword = mock.a_valid_company.password;
            mock.a_valid_company.password = "COMPANY1";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.password =  theValidPassword;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");
                
                done();
            });
        }); 
        it("Error: company with password that does not contains a number",function(done){
            var theValidPassword = mock.a_valid_company.password;
            mock.a_valid_company.password = "Companyy";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.password =  theValidPassword;

                var errors = res.body.message;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("Password must contain at least one capital letter, one lowercase letter and one number");
                
                done();
            });
        });
        it("Error: the name of the continent is not valid",function(done){
            var theValidContinent = mock.a_valid_company.continent;
            mock.a_valid_company.continent = "continent";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.continent =  theValidContinent;

                var errors = res.body.message;

                errors.length.should.equal(1);
                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("continent is not a valid continent!");
                
                done();
            });
        });
        it("Error: the name of the category is not valid",function(done){
            var theValidCategory = mock.a_valid_company.category;
            mock.a_valid_company.category = "category";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.category =  theValidCategory;

                var errors = res.body.message;

                errors.length.should.equal(1);
                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal("category is not a valid category!");
                
                done();
            });
        });                 
        it("Error: company with invalid phone number format",function(done){

            var theValidPhoneNumber = mock.a_valid_company.phone;
            mock.a_valid_company.phone = "5145555555-";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){
                var errors = res.body.message;
                var phoneNumber = mock.a_valid_company.phone;

                mock.a_valid_company.phone = theValidPhoneNumber;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal(phoneNumber + ' is not a valid phone number!');

                done();
            });
        });
        it("Error: company with invalid postal code format",function(done){

            var theValidPostalCode = mock.a_valid_company.postal_code;
            mock.a_valid_company.postal_code = "H2D3Z6";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){
                var errors = res.body.message;
                var postalCode = mock.a_valid_company.postal_code;

                mock.a_valid_company.postal_code = theValidPostalCode;

                errors.length.should.equal(1);

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                errors[0].should.equal(postalCode + ' is not a valid postal code!');

                done();
            });
        });
        it("Error: the title and description of the certification is required",function(done){

            mock.a_valid_company.certifications.push({});

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){
                var errors = res.body.message;

                mock.a_valid_company.certifications = [];

                errors.length.should.equal(2);
                res.status.should.equal(400);
                res.body.success.should.equal(false);

                utilApp.arrayContains(errors, "[Certification.title] - The title of the certification is required")
                utilApp.arrayContains(errors, "[Certification.description] - The description of the certification is required");

                done();
            });
        });                  
        it("Error: company with email that is already taken",function(done){

            var theCompanyName = mock.a_valid_company.company_name;
            mock.a_valid_company.company_name = "other_name";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.company_name = theCompanyName;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                res.body.message.should.equal("Company already exists !");

                done();
            });
        });  
        it("Error: company with name that is already taken",function(done){

            var theCompanyEmail = mock.a_valid_company.email;
            mock.a_valid_company.email = "other_email@gmail.com";

            request
            .post('/companies/signup')
            .send(mock.a_valid_company)
            .end(function(err,res){

                mock.a_valid_company.email = theCompanyEmail;

                res.status.should.equal(400);
                res.body.success.should.equal(false);
                res.body.message.should.equal("Company already exists !");
                
                done();
            });
        });                             
    });
    
})
