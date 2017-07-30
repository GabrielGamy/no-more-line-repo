"use strict";

var minLen = 8, maxLen = 200; 

module.exports = {
    a_valid_company : {
        "company_name": "Borgel Company" + Math.random(),
        "email": "brealborgel"+ Math.random() +"@domain.com",
        "password": "NomorelinePassword88",
        "continent": "America",
        "country": "Canada",
        "city": "Montréal",
        "neighborhood": "",
        "location": "500 Terrasse Newman app:326",
        "postal_code": "h8r2y7",
        "category": "restaurant",
        "short_description": "Example of description",
        "services": "aucun service",
        "opening_hours": {
            "Monday":{
                "opening_time": "11:00AM",
                "closing_time": "00:00PM"
            },
            "Tuesday":{
                "opening_time": "NA",
                "closing_time": "NA"
            },
            "Wednesday":{
                "opening_time": "NA",
                "closing_time": "NA"
            },
            "Thursday":{
                "opening_time": "NA",
                "closing_time": "NA"
            },
            "Friday":{
                "opening_time": "NA",
                "closing_time": "NA"
            },
            "Saturday":{
                "opening_time": "NA",
                "closing_time": "NA"
            },
            "Sunday":{
                "opening_time": "NA",
                "closing_time": "NA"
            }
        },
        "phone": "414-557-0079",
        "cuisine": "Italienne",
        "price": {
            "from": 0,
            "to": 200
        },
        "chief": "Jerome le grand",
        "pictures": [
            {
                "name": "Picture 1",
                "url": "www.picture.com"
            },
            {
                "name": "Picture 2",
                "url": "www.picture.com"
            }
        ],
        "notes_for_customers": "",
        "web_site_url": "",
        "certifications": [
            {
                "title": "Certification 1",
                "description": "Description 1"
            }
        ],
        "isActive": true,
        "dateCreated": Date()
    },

    fieldsless_company : {

    },
    company_with_fields_that_contain_only_spaces : {
        "company_name": "         ",
        "email": "         ",
        "password": "         ",
        "continent": "         ",
        "country": "         ",
        "city": "         ",
        "neighborhood": "         ",
        "location": "         ",
        "postal_code":"         ",
        "category":"         ",
        "short_description": "  ",
        "services": "         ",
        "opening_hours": {
            "Monday":{
                "opening_time": "         ",
                "closing_time": "         "
            },
            "Tuesday":{
                "opening_time": "         ",
                "closing_time":"         "
            },
            "Wednesday":{
                "opening_time": "   ",
                "closing_time": "   "
            },
            "Thursday":{
                "opening_time": "   ",
                "closing_time": "   "
            },
            "Friday":{
                "opening_time": "   ",
                "closing_time": "   "
            },
            "Saturday":{
                "opening_time": "   ",
                "closing_time": "   "
            },
            "Sunday":{
                "opening_time": "   ",
                "closing_time": "   "
            }
        },
        "phone": "   ",
        "cuisine": "   ",
        "price": { },
        "chief": "   ",
        "pictures": [],
        "notes_for_customers": "   ",
        "web_site_url": "   ",
        "certifications": [],
        "isActive": "   ",
        "dateCreated": "   "
    },
    company_with_fields_that_exceed_the_maximum_length : {
        "company_name": fillerFields(),
        "email": fillerFields(),
        "password": fillerFields(),
        "continent": fillerFields(),
        "country": fillerFields(),
        "city": fillerFields(),
        "neighborhood": fillerFields(),
        "location": fillerFields(),
        "postal_code": fillerFields(),
        "category":fillerFields(),
        "short_description": fillerFields(),
        "services": fillerFields(),
        "opening_hours": {
            "Monday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            },
            "Tuesday":{
                "opening_time": fillerFields(),
                "closing_time":fillerFields()
            },
            "Wednesday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            },
            "Thursday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            },
            "Friday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            },
            "Saturday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            },
            "Sunday":{
                "opening_time": fillerFields(),
                "closing_time": fillerFields()
            }
        },
        "phone": fillerFields(),
        "cuisine": fillerFields(),
        "price": { },
        "chief": fillerFields(),
        "pictures": [
            {
                "name": fillerFields(),
                "url": fillerFields()
            }
        ],
        "notes_for_customers": fillerFields(),
        "web_site_url": fillerFields(),
        "certifications": [
            {
                "title": fillerFields(),
                "description": fillerFields()
            }
        ],
        "isActive": null,
        "dateCreated": null
    }
}

function fillerFields(){
    var value = "";
    for(var i = 0; i <= maxLen; ++i) value += "F";
    return value;
}