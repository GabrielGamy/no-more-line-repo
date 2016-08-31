"use strict";

module.exports = {
    a_valid_company : {
        "company_name": "Borgel Company" + Math.random(),
        "email": "brealborgel"+ Math.random() +"@domain.com",
        "password:":"NomorelinePassword88",
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
    company_with_an_empty_value : {
        "company_name": "",
        "email": "",
        "password": "",
        "continent": "",
        "country": "",
        "city": "",
        "neighborhood": "",
        "location": "",
        "postal_code": "",
        "category": "",
        "short_description": "  ",
        "services": "",
        "opening_hours": {
            "Monday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Tuesday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Wednesday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Thursday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Friday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Saturday":{
                "opening_time": "",
                "closing_time": ""
            },
            "Sunday":{
                "opening_time": "",
                "closing_time": ""
            }
        },
        "phone": "",
        "cuisine": "",
        "price": {

        },
        "chief": "Jerome le grand",
        "pictures": [
            {
                "name": "",
                "url": ""
            },
            {
                "name": "",
                "url": ""
            }
        ],
        "notes_for_customers": "",
        "web_site_url": "",
        "certifications": [
            {
                "title": "",
                "description": ""
            }
        ],
        "isActive": null,
        "dateCreated": null

    }
}