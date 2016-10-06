var express = require('express');
var router = express.Router();

var srcFolder = "../../";

var utilApp = require(srcFolder + "services/utilApp");
var hateoas = require(srcFolder + "services/hateoasLinks").hateoas;

var dbClient = require(srcFolder + "services/elasticSearch");
var envConfig = require(srcFolder + "config/env");


// ================
// @param: lat_lon_string
// a lat_lon_string query parameter can be provided: 
// required when we want to sort by distance according to the user's location
//
//      values accepted: the concatenation of latitude and longitute separeted by a comma
//
//      default value : "0,0"
//
// @param: sort_by
// a sort_by query parameter can be provided: 
//
//      values accepted: 
//          distance: sort based on the current position of the user, from the nearest to furthest
//          name:     sort by the companies's name, alphabetical order
//          price:    sort based on the offered price. from the smallest to the biggest
//
//      default value : name
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
                category: req.categoryName,
                sort_by: req.sortBy,
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
    var sortBy = req.query.sort_by || "name"; // sort by name by default
    var lat_lon_string = req.query.lat_lon_string || "0,0"; // lat = 0 and lon = 0 by default
    var _from = parseInt(req.query._from) || 0; // beginning at 0 by default
    var _size = parseInt(req.query._size) || 10; // return 10 results by default

    var isValid = isValidCategory(categoryName) && isValidSortBy(sortBy) &&  _from >= 0 && _size >= 1;
    
    if (isValid){

        if(isValidCurrentPosition(sortBy, lat_lon_string)){

            req.categoryName = categoryName;
            req.sortBy = sortBy;
            req.currentPosition = getCurrentPosition(lat_lon_string),
            req._from = _from;
            req._size = _size;
            
            next();            

        }else{
            var message = {
                text : "Impossible to sort by distance without a valid current position",
                missing_parameter:{
                    lat_lon_string: "the concatenation of latitude and longitute separeted by a comma"
                }
            }
            var err = new Error(); 
            err.message = message;
            err.status = 400;
            next(err);
        }

    }else{
        var message = {
            text : "Invalid parameters",
            accepted_values: {
                category_name: "restaurants, shops, special-events, barber-shops, personal-businesses, others",
                sort_by: "distance, name, price",
                _from: "_from >= 0",
                _size: "_size >= 1",
                current_position:["latitude,longitute"]
            }
        }
        
        var err = new Error(); 
        err.message = message;
        err.status = 400;

        next(err);
    }
}

function isValidCategory(categoryName){

    return categoryName === "all"   || categoryName === "restaurants"    || 
           categoryName === "shops" || categoryName === "special-events" || 
           categoryName === "barber-shops" || categoryName === "others"  || 
           categoryName === "personal-businesses";
}

function isValidSortBy(sortBy){

   return sortBy === "distance" || 
          sortBy === "name"     || 
          sortBy === "price";    
}

function isValidCurrentPosition(sortBy, lat_lon_string){
    // we check lat_lon_string parameter only when we want to sort by distance
    var location = getCurrentPosition(lat_lon_string);
    return sortBy === "distance" ? Object.keys(location).length == 2 : true;
}

function getCurrentPosition(lat_lon_string){
    var location = {};
    var lat_lon_array = lat_lon_string.split(",");

    if(lat_lon_array && lat_lon_array.length == 2){
        
        var lat = parseFloat(lat_lon_array[0]);
        var lon = parseFloat(lat_lon_array[1]);

        if(!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0){

            location = {
                lat: lat,
                lon: lon
            }
            
        }
    }

    return location;
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
            },
            sort: getSortQuery(req)                      
        },
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

function getSortQuery(request){
    
    var query;

    if(!request || !request.sortBy) return {};

    switch(request.sortBy){

        case "distance":
            query = [
                {
                    "_geo_distance": {
                        "company_geolocation_infos.location": {
                            "lat": request.currentPosition.lat || 0,
                            "lon": request.currentPosition.lon || 0
                        },
                        "order": "asc",
                        "unit": "km",
                        "distance_type": "sloppy_arc"
                    }
                }
            ]
            break;
        case "price":
            query = {
                "price.from": "asc"
            };
            break
        default: // sort by name
            query = {
                "company_name_not_analyzed_for_sorting": "asc"
            };
            break;
    }
    return query;
}

module.exports = router;