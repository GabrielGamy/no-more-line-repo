// Notre  DA0

var envConfig = require("../config/env");

// ============
// url: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
// ============
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: envConfig.SEARCHBOX_URL,
  log: 'trace'
});


// ============
// create index url: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-indices-create
// create index details: https://www.elastic.co/guide/en/elasticsearch/reference/2.3/indices-create-index.html

// create mappings url: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-indices-putmapping
// create mappings details: https://www.elastic.co/guide/en/elasticsearch/reference/2.3/indices-put-mapping.html

// dynamic attribute: https://www.elastic.co/guide/en/elasticsearch/guide/current/dynamic-mapping.html
// ============
exports.putMapping = function (typeName, modelObject, callback){
    
    var indexName = envConfig.ELASTIC_SEARCH_NODE_NAME.toLowerCase();
    typeName = typeName.toLowerCase();

    client.indices.create({
        index: indexName,
        ignore: [400]
    }, function(error, response){

        if(error){
            error.status = 500;
            callback(error, null);
        }else {
            var alreadyExist = (response.error && response.error.reason === "already exists");

            if (response.status == 400 && !alreadyExist) {
                error = response;
                callback(error, null);                
            } else {
                client.indices.putMapping({
                    updateAllTypes: true,
                    index: indexName,
                    type: typeName,
                    body: {
                        properties: modelObject,
                        dynamic: "strict", 
                    }
                },function (error, response) {
                    if (error) {
                        error.status = 500;
                        callback(error, null);
                    } else {
                        response.status = 200;
                        callback(null, response);
                    }    
                });
            }
        } 
    });    
}


// ============
// url: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create
// details : https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-index_.html
// ============
exports.create = function(typeName, data, callback){

    var indexName = envConfig.ELASTIC_SEARCH_NODE_NAME.toLowerCase();

    client.create({
        index: indexName,   // Bd
        type: typeName,     // table    
        refresh: true,      // mettre a jour    
        body: data,         // les champs de la table ou ligne
        ignore: [400]       // gestion de l'erreur par nous meme'
    }, function (error, response) {
        if (error) {
            error.status = 500;
            callback(error, null);
        } else {

            if(response.status == 400){
                var isStrict = (response.error 
                                && response.error.reason 
                                && response.error.reason.indexOf("mapping set to strict") != 1);          

                if(isStrict) {
                    error = new Error("the request body do not respect the mapping");
                    error.status = 400;
                    callback(error, null);;
                }else{
                    error.status = 500;
                    callback(error, null);
                }
            }else{
                callback(null, response);
            }
        }    
    });
}


// ============
// url: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch
// ============
exports.search = function(data,callback){
    client.msearch({
        body: data
    },function(error,response){
        if(error){
            error.status = 500;
            callback(error,null);
        }else{
            callback(null,response);
        }
    });    

}