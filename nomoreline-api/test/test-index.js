"use strict";

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5000");

describe("Home page",function(){
    
    it("should load the home page properly",function (done) {
        server
        .get('/')
        .end(function(err,res){
            res.status.should.equal(200);
            done();
        });       
    });
});