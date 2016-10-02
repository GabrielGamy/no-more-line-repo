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
        "companies_login": "/companies/login",
        "get_all_companies": "/companies"
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

hateoas.registerLinkHandler("companies_signin", function(company) {
    return {
        "self": "/companies/signin",
        "companies": "/companies/" + company._id
    };   
});

// ================
// getting companies navigation links ======
// ================ 
hateoas.registerLinkHandler("get_all_companies", function() {
    return {
        "self": "/companies",
        
        "get_restaurants": "/companies?category_name=restaurants",

        "get_shops": "/companies?category_name=shops",
        
        "get_barber_shops": "/companies?category_name=barber-shops",
        
        "get_special_events": "/companies?category_name=special-events",
        
        "get_personal_businesses": "/companies?category_name=personal-businesses",
        
        "get_others_type_of_companies": "/companies?category_name=others"
    };
});

hateoas.registerLinkHandler("get_restaurants", function() {
    return {
        
        "self": "/companies?category_name=restaurants"
    };
});

hateoas.registerLinkHandler("get_shops", function() {
    return {
        
        "self": "/companies?category_name=shops"
    };
});

hateoas.registerLinkHandler("get_barber_shops", function() {
    return {
        
        "self": "/companies?category_name=barber-shops"
    };
});

hateoas.registerLinkHandler("get_special_events", function() {
    return {
        
        "self": "/companies?category_name=special-events"
    };
});

hateoas.registerLinkHandler("get_personal_businesses", function() {
    return {
        
        "self": "/companies?category_name=personal-businesses"
    };
});

hateoas.registerLinkHandler("get_others_type_of_companies", function() {
    return {
        
        "self": "/companies?category_name=others"
    };
});

exports.hateoas = hateoas;