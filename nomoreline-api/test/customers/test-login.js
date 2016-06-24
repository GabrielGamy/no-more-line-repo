var supertest = require("supertest");
var should = require("should");

var serverUrl = require("../../src/services/utilApp").getBaseUrl();
var request = supertest.agent(serverUrl);

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
});