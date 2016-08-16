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
exports.putMapping = function (indexName, typeName, modelObject, callback){

    indexName = indexName.toLowerCase();
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