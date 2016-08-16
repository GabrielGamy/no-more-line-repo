// ================
// Model Object ======
// ================

exports.CompanyModel = {
     "name":{
         "type": "String"
     },
     "email":{
         "type": "String"
     },
     "continent":{
         "type": "String"
     },
    "country":{
         "type": "String"
     },
    "city":{
         "type": "String"
     },
    "neighborhood":{
         "type": "String"
     },
    "location":{
         "type": "String"
     },
    "postal_code":{
         "type": "String"
     },
    "category":{
         "type": "String"
     },
    "short_description":{
         "type": "String"
     },
    "services":{
         "type": "String"
     },
    "opening_hours": {
         "type": "nested",
         "properties":{
            "day_of_the_week":{
                "type": "String"
            },
            "opening_time":{
                "type": "String"
            },
            "closing_time":{
                "type": "String"
            }            
         }
     },
    "phone":{
         "type": "String"
     },
    "cuisine":{
         "type": "String"
     },
    "price":{
         "type": "object",
         "properties":{
            "from":{
                "type": "Double"
            },
            "to":{
                "type": "Double"
            }          
         }
     },
    "chief":{
         "type": "String"
     },
    "pictures":{
         "type": "nested",
         "properties":{
            "name":{
                "type": "String"
            },
            "url":{
                "type": "String"
            }          
         }
     },
    "notes_for_customers":{
         "type": "String"
     },
    "web_site_url":{
         "type": "String"
     },
    "certifications":{
         "type": "nested",
         "properties":{
            "title":{
                "type": "String"
            },
            "description":{
                "type": "String"
            }          
         }
     },
};