"use strict";

function response  (status, message, links) {
	var data = {
      status: status,
      message: message,
      links: links 
    };
    return JSON.stringify(data,null,4);
}

exports.response = response;