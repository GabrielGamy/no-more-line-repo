// ================
// Model Object ======
// ================

exports.CompanyModel = {
     "company_name":{
         "type": "String"
     },
     "email":{
         "type": "String"
     },
     "password":{
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
         "type": "object",
         "properties":{
            "Monday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Tuesday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Wednesday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Thursday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Friday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Saturday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
            },
            "Sunday":{
                "type": "object",
                "properties": {
                    "opening_time":{
                        "type": "String"
                    },
                    "closing_time":{
                        "type": "String"
                    }                    
                }             
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
            "_id":{
                "type": "String"
            },             
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
            "_id":{
                "type": "String"
            },              
            "title":{
                "type": "String"
            },
            "description":{
                "type": "String"
            }          
         }
     },
    "isActive":{
         "type": "Boolean"
     },
    "dateCreated":{
         "type": "Date"
     },
    "company_coordinates": {
        "type" : "object",
         "properties":{          
            "latitude":{
                "type": "Double"
            },
            "longitude":{
                "type": "Double"
            }          
         }        
    }          
};