var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCmzFiJqWHGY66Gu8acevWwsR2Hq--hh4U' // Standard API key
});

module.exports = {
    
    PORT: process.env.PORT || 5000,

    BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
    
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/nomorelinedb',
    
    SEARCHBOX_SSL_URL: process.env.SEARCHBOX_URL || 'http://localhost:9200', 
    
    ELASTIC_SEARCH_NODE_NAME: 'nomoreline_app_node', 
    
    SECRET: process.env.SECRET || 'aimer rire mais ne pas Aimer Rire',
    
    GOOGLE_MAPS_CLIENT: googleMapsClient
};