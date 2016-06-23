"use strict";

exports.response = function (success, message, hateoas) {
  var data = {
    success: success,
    message: message,
    hateoas: hateoas 
  };
  return data;
}

exports.getBaseUrl = function(){
  if(process.env.NODE_ENV === "production"){
    return "https://nomoreline-api.herokuapp.com";
  }else{
    return "http://localhost:5000";
  }
}