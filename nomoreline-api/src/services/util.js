"use strict";

exports.send_error = function (status,message,fields) {
    return {
      status: status,
      message: message,
      fields: fields 
    };
}