"use strict";

var utilApp = require("./utilApp");
var hateoas = require("hateoas")({baseUrl: utilApp.getBaseUrl()});

hateoas.registerLinkHandler("error", function() {
    return {
        "home": "/",
    };
});
 
hateoas.registerLinkHandler("root", function() {
    return {
        "self": "/",
        "companies": "/companies"
    };
});

hateoas.registerLinkHandler("customers", function(customer) {
    return {
        "self": "/customers/" + customer.id
    };   
});

exports.hateoas = hateoas;