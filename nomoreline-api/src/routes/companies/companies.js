var express = require('express');
var router = express.Router();

var srcFolder = "../../";

var utilApp = require(srcFolder + "services/utilApp");
var hateoas = require(srcFolder + "services/hateoasLinks").hateoas;

var dbClient = require(srcFolder + "services/elasticSearch");
var envConfig = require(srcFolder + "config/env");


// ================
// @param: sort_by
// a sort_by query parameter can be provided: 
//
//      values accepted: 
//          distance: sort based on the current position of the user, from the nearest to furthest
//          name: sort by the companies's name, alphabetical order
//          price: sort based on the offered price. from the smallest to the biggest
//
//      default value : distance
//
// @params: category_name
// a category_name parameter can also be provided to get the type of companies we want 
//
//      values accepted:
//          restaurants, shops, barber-shops, special-events, personal-businesses or others
//
//      default value: all 
//
// @params: _from 
// a _from parameter can be provided to specify the starting offset 
//
//      values accepted: any Number >= 0
//      default value: 0 
//
// @params: _size 
// a _size parameter can be provided to specify the number of hits to return
//
//      values accepted: any Number >= 1
//      default value: 10 
// ================
router.get("/", isValidParams, buildSearchBody, function(req, res, next){

    dbClient.search(req.searchBody, function(err, response){
        if(err){
            err.status = 500;
            next(err);
        }else{
            var message = {
                text: "Request executed successfully",
                sort_by: req.sortBy,
                category: req.categoryName,
                pagination:{
                    from: req._from,
                    size: req._size,                    
                },                
                results : response.hits.hits
            }

            var navigation_links = hateoas.link(getCategoryInfos()[req.categoryName].hateoas_link,{});
            res.send(utilApp.response(true, message , navigation_links));
        }
    });
});

function isValidParams (req, res, next){
    var categoryName = req.query.category_name || "all"; // all by default
    var sortBy = req.query.sort_by || "distance"; // distance by default
    var _from = req.query._from || 0; // beginning at 0 by default
    var _size = req.query._size || 10 // return 10 results by default
    
    var isValidCategory = categoryName === "all"   || categoryName === "restaurants"    || 
                          categoryName === "shops" || categoryName === "special-events" || 
                          categoryName === "barber-shops" || categoryName === "others"  || 
                          categoryName === "personal-businesses";

    var isValidSortBy = sortBy === "distance" || sortBy === "name" || sortBy === "price";

    if (isValidCategory && isValidSortBy && _from >= 0 && _size >= 1){
        req.categoryName = categoryName;
        req.sortBy = sortBy;
        req._from = _from;
        req._size = _size;
        next();
    }else{
        var message = {
            text : "Invalid parameters",
            accepted_values: {
                category_name: ["restaurants, shops, special-events, barber-shops, personal-businesses, others"],
                sort_by: ["distance, name, price"],
                _from: "_from >= 0",
                _size: "_size >= 1"
            }
        }
        var err = new Error(); 
        err.message = message;
        err.status = 400;
        next(err);
    }
}

function buildSearchBody(req, res, next){


    var searchBody = {
        index : envConfig.ELASTIC_SEARCH_NODE_NAME, 
        type : "company",
        _sourceExclude: ["email","password","dateCreated","isActive"],
        body: {
            query: {
                filtered: {
                    filter: getFilterMacthQuery(req.categoryName)
                }
            }            
        },
        sort: req.sortBy === "price" ? "price.from:asc" : "company_name:asc",
        from: req._from , 
        size: req._size 
    }

    req.searchBody = searchBody;
    next();
}

function getCategoryInfos(){

    var categories_infos = {
        "restaurants":{
            name: "restaurant",
            hateoas_link : "get_restaurants"
        },
        "shops":{
            name: "shop",
            hateoas_link : "get_shops"
        },
        "barber-shops":{
            name: "barber shop",
            hateoas_link : "get_barber_shops"
        },
        "special-events":{
            name: "special event",
            hateoas_link : "get_special_events"
        },
        "personal-businesses":{
            name: "personal business",
            hateoas_link : "get_personal_businesses"
        },
        "others":{
            name: "others",
            hateoas_link : "get_others_type_of_companies"
        },
        "all":{
            name: "all",
            hateoas_link : "get_all_companies"
        }        
    }
     
    return categories_infos;
}

function getFilterMacthQuery(categoryName){
    var filterMatchQuery; 

    if(categoryName === "all"){
        filterMatchQuery = {
            "match_all": {}
        }
    }else{
        filterMatchQuery = {
            "match":{
                "category": getCategoryInfos()[categoryName].name
            }
        }
    } 
    return filterMatchQuery    
}

module.exports = router;