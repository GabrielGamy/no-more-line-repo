var express = require('express');
var router = express.Router();

var srcFolder = "../../";

var utilApp = require(srcFolder + "services/utilApp");
var hateoas = require(srcFolder + "services/hateoasLinks").hateoas;

var dbClient = require(srcFolder + "services/elasticSearch");
var envConfig = require(srcFolder + "config/env");


// ================
// a sort_by query parameter can be provided: 
// @param: sort_by
//      values accepted: 
//          distance: sort based on the current position of the user, from the nearest to furthest
//          name: sort by the companies's name, alphabetical order
//          price: sort based on the offered price. from the smallest to the biggest
//
// a category_name parameter can also be provided to get the type of companies we want 
// @params: category_name
//      values accepted:
//          restaurants, shops, barber-shops, special-events, personal-businesses or others
// ================
router.get("/", isValidParams, function(req, res, next){

    console.log(req.categoryName);
    console.log(req.sortBy);

    var message = {
        text: "Request executed successfully",
        results : []
    }
    res.send(utilApp.response(true, message , hateoas.link(getHateoasLink(req.categoryName),{})));
});

function isValidParams (req, res, next){
    var categoryName = req.query.category_name || "all";
    var sortBy = req.query.sort_by || "distance"; // distance by default
    
    var isValidCategory = categoryName === "all"   || categoryName === "restaurants"    || 
                          categoryName === "shops" || categoryName === "special-events" || 
                          categoryName === "barber-shops" || categoryName === "others"  || 
                          categoryName === "personal-businesses";

    var isValidSortBy = sortBy === "distance" || sortBy === "name" || sortBy === "price";

    if (isValidCategory && isValidSortBy){
        req.categoryName = categoryName;
        req.sortBy = sortBy;
        next();
    }else{
        var message = {
            text : "Invalid parameters",
            accepted_values: {
                category_name: ["restaurants, shops, special-events, barber-shops, personal-businesses, others"],
                sort_by: ["distance, name, price"]
            }
        }
        var err = new Error(); 
        err.message = message;
        err.status = 400;
        next(err);
    }
}

function getHateoasLink(categoryName){

    var hateoasLink = "";

    switch (categoryName) {
        case "restaurants":
            hateoasLink = "get_restaurants";
            break;
        case "shops":
            hateoasLink = "get_shops";
            break;
        case "barber-shops":
            hateoasLink = "get_barber_shops";
            break;
        case "special-events":
            hateoasLink = "get_special_events";
            break;
        case "personal-businesses":
            hateoasLink = "get_personal_businesses";
            break;            
        case "others":
            hateoasLink = "get_others_type_of_companies";
            break;    
        default:
            hateoasLink = "get_all_companies";
    }
    return hateoasLink;    
}

module.exports = router;