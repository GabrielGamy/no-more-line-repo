"use strict";

exports.is_a_valid_customer_data = function (data) {
    return (data.hasOwnProperty("last_name") && !isEmpty(data.last_name))
    && (data.hasOwnProperty("first_name") && !isEmpty(data.first_name)) 
    && (data.hasOwnProperty("email") && !isEmpty(data.email))
    && (data.hasOwnProperty("password") && !isEmpty(data.password))
    && (data.hasOwnProperty("phone") && !isEmpty(data.phone))
    && data.hasOwnProperty("address") 
    && data.hasOwnProperty("postal_code");
}

function isEmpty(data) {
    return !data;
}