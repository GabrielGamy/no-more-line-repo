var envConfig = require("./env");
var mongoose = require("mongoose");
var utilApp = require("../services/utilApp");
var hateoas = require("../services/hateoasLinks").hateoas;

// ================
// mongoDb middleware connection ======
// ================
exports.getConnection = function(req, res, next){

    if(mongoose.connection.readyState == 1){ // database connection is already opened
        next();
        return;
    }

    var message = "Database connection successful : " + envConfig.DATABASE_URL;
    
    mongoose.connect(envConfig.DATABASE_URL, function(err) {
        if (err){
            message = "Service temporarily unavailable. Please try later !";
            res.status(500);
            res.send(utilApp.response(false, message, hateoas.link("error",{})));

            utilApp.createLogs("Database connection error", err, null);
            return;
        }
        console.log(message); // success
        next();
    });    
}