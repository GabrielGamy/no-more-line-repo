"use strict";

var envConfig = require("../config/env");
var utilApp = require("./utilApp");
var hateoas = require("hateoas")({baseUrl: envConfig.BASE_URL});

// ================
// error navigation links ======
// ================
hateoas.registerLinkHandler("error", function() {
    return {
        "home": "/",
    };
});

// ================
// home navigation links ======
// ================ 
hateoas.registerLinkHandler("home", function() {
    return {
        "self": "/",
        "customers_login": "/customers/login",
        "companies_login": "/companies/login"
    };
});

// ================
// customers navigation links ======
// ================ 
hateoas.registerLinkHandler("customers_login", function() {
    return {
        "self": "/customers/login",
        "customers_signin": "/customers/signin",
        "customers_signup": "/customers/signup"
    };
});


hateoas.registerLinkHandler("customers_signup", function() {
    return {
        "self": "/customers/signup",
        "customers_signin": "/customers/signin"
    };   
});

hateoas.registerLinkHandler("customers_signin", function(customer) {
    return {
        "self": "/customers/signin",
        "customers": "/customers/" + customer._id
    };   
});
// ================
// companies navigation links ======
// ================ 
hateoas.registerLinkHandler("companies_login", function() {
    return {
        "self": "/companies/login",
        "companies_signin": "/companies/signin",
        "companies_signup": "/companies/signup"
    };
});

hateoas.registerLinkHandler("companies_signup", function() {
    return {
        "self": "/companies/signup",
        "companies_signin": "/companies/signin"
    };   
});

exports.hateoas = hateoas;