"use strict";

module.exports = {
    company_with_empty_body:{},
    company_with_a_valid_body : {
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
    }
};