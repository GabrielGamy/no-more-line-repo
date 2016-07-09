"use strict";

exports.response = function (success, message, hateoas) {
  var data = {
    success: success,
    message: message,
    hateoas: hateoas 
  };
  return data;
}

exports.createLogs = function (message, error, received_ata) {
  var result = {
    _date : new Date(), // Current Date
    _message: message,
    _error: error,
    _received_ata: received_ata
  };
  console.log("Error infos:" + JSON.stringify(result, null , 4));
}

exports.arrayContains = function (array, value) {
  return array.indexOf(value) != -1;
}