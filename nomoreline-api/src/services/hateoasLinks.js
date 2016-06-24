"use strict";

var utilApp = require("./utilApp");
var hateoas = require("hateoas")({baseUrl: utilApp.getBaseUrl()});

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


hateoas.registerLinkHandler("customers", function(customer) {
    return {
        "self": "/customers/" + customer.id
    };   
});

// ================
// companies navigation links ======
// ================ 


exports.hateoas = hateoas;