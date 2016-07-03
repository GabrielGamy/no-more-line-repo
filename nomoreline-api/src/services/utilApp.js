"use strict";

exports.response = function (success, message, hateoas) {
  var data = {
    success: success,
    message: message,
    hateoas: hateoas 
  };
  return data;
}