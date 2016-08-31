// ================
// Model Object Validator ======
// ================

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var minLen = 8, maxLen = 200;

var emailRegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

var phoneNumberRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // US and CANADA

var postalCodeRegEXP = /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/; // US and CANADA

var openingHoursRegExp =  /([0-9]{2}:[0-9]{2}(PM|pm|AM|am)|NA)/; // NA mean close

var continentValidator = function (continentName){

    continentName = continentName.toLowerCase();

    return continentName === "africa"   ||
           continentName === "america"  ||
           continentName === "europe"   ||
           continentName === "asia"     ||
           continentName === "oceania";
};

var categoryValidator = function (categoryName){

    categoryName = categoryName.toLowerCase();
    
    return categoryName === "restaurant"        ||
           categoryName === "shop"              ||
           categoryName === "special event"     ||
           categoryName === "barber shop"       ||
           categoryName === "others"            ||
           categoryName === "personal business";
};

// ================
// Schema and Validator ======
// ================

var CompanySchema = new Schema({
    _id: false,
    company_name:{
        type: String,
        trim: true,
        required: [true, 'The name of the company is required'],
        maxlength: [maxLen,"The name of the company must be less than " + maxLen + " caracters"]
    },
    email:{
        type: String, 
        unique: true,
        trim: true,
        required: [true, 'The email of the company is required'],
        maxlength: [maxLen,"The email must be less than " + maxLen + " caracters"],
        match: [emailRegExp,"Invalid email format"]
    },
    password:{
        type: String,
        trim: true,
        validate:{
          validator:function(value){
                return /.*[A-Z].*/.test(value)
                    && /.*[a-z].*/.test(value)
                    && /.*[0-9].*/.test(value);
          },
          message: "Password must contain at least one capital letter, one lowercase letter and one number"  
        },
        required: [true, 'The password is required'],
        minlength: [minLen,"Password must be " + minLen + " caracters or more"],
        maxlength: [maxLen,"Password must be less than " + maxLen + " caracters"] // password will be hashed
    },    
    continent:{
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return continentValidator(value);
            },
            message: '{VALUE} is not a valid continent!'
        },        
        required: [true, 'The continent is required'],
    },
    country:{
        type: String,
        trim: true,
        required: [true, 'The country is required'],
        maxlength: [maxLen,"The country name must be less than " + maxLen + " caracters"]
    },
    city:{
        type: String,
        trim: true,
        required: [true, 'The city is required'],
        maxlength: [maxLen,"The city name must be less than " + maxLen + " caracters"]
    },
    neighborhood:{
        type: String,
        trim: true
    },
    location:{
        type: String,
        trim: true,
        required: [true, 'The location is required'],
        maxlength: [maxLen,"The location name must be less than " + maxLen + " caracters"]

    },
    postal_code:{
        type: String,
        trim: true,
        uppercase: true,
        validate: {
            validator: function(value) {
                return postalCodeRegEXP.test(value);
            },
            message: '{VALUE} is not a valid postal code!'
        },
        required: [true, 'The postal code is required']
    },
    category:{
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return categoryValidator(value);
            },
            message: '{VALUE} is not a valid category!'
        },        
        required: [true, 'The category is required'],
    },
    short_description:{
        type: String,
        trim: true,
        maxlength: [maxLen,"The description must be less than " + maxLen + " caracters"],
        required:[true, "The short description is required"]
    },
    services:{
        type: String,
        trim: true,
        required: [true, 'The services is required']
    },
    opening_hours:{
        Monday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Monday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Monday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Monday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Monday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Tuesday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Tuesday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Tuesday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Tuesday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Tuesday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Wednesday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Wednesday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Wednesday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Wednesday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Wednesday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Thursday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Thursday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Thursday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Thursday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Thursday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Friday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Friday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Friday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Friday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Friday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Saturday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Saturday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Saturday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Saturday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Saturday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        },
        Sunday:{
            opening_time:{
                type: String,
                trim: true,
                required: [true, "[Sunday.opening_time] - The opening time is required"],
                match: [openingHoursRegExp,"[Sunday.opening_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            },
            closing_time:{
                type: String,
                trim: true,
                required: [true, "[Sunday.closing_time] - The closing time is required"],
                match: [openingHoursRegExp,"[Sunday.closing_time] - Invalid format. Must be like 12:00PM, 08:00AM or NA when closed"]
            }             
        }                                                
    },
    phone:{
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return phoneNumberRegExp.test(value);
            },
            message: '{VALUE} is not a valid phone number!'
        },        
        required: [true, 'The phone number is required']
    },
    cuisine:{
        type: String,
        trim: true,
        maxlength: [maxLen,"Cuisine name must be less than " + maxLen + " caracters"]        
    },
    price:{
        from:{
            type: Number,
            required:[true, "Price.from (minimum price) is required"]
        },
        to:{
            type: Number,
            required:[true, "Price.to (minimum price) is required"]
        }        
    },
    chief:{
        type: String,
        trim: true,
        required: [true, 'The name of the chief is required'],
        maxlength: [maxLen,"The name of the chief must be less than " + maxLen + " caracters"]
    },
    pictures:[{
        name:{
            type: String,
            trim: true,
            maxlength: [maxLen,"[Picture.name] - The name of the picture must be less than " + maxLen + " caracters"],
            required:[true, "[Picture.name] - The name of the picture is required"]
        },
        url:{
            type: String,
            trim: true,
            maxlength: [maxLen,"[Picture.url] - The link of the picture must be less than " + maxLen + " caracters"],
            required:[true, "[Picture.url] - The link of the picture is required"]
        }        
    }],
    notes_for_customers:{
        type: String,
        trim: true,
        maxlength: [maxLen,"The customers notes must be less than " + maxLen + " caracters"]
    },
    web_site_url:{
        type: String,
        trim: true,
        maxlength: [maxLen,"The web site url must be less than " + maxLen + " caracters"]
    },
    certifications:[{
        title:{
            type: String,
            trim: true,
            maxlength: [maxLen,"[Certification.title] - The title of the certification must be less than " + maxLen + " caracters"],
            required:[true, "[Certification.title] - The title of the certification is required"]
        },
        description:{
            type: String,
            trim: true,
            maxlength: [maxLen,"[Certification.description] - The description of the certification must be less than " + maxLen + " caracters"],
            required:[true, "[Certification.description] - The description of the certification is required"]
        }        
    }],
    isActive:{
        type: Boolean,
        required:[true, "isActive is required"],
        default: true
    },
    dateCreated:{
        type: Date,
        required:[true, "dateCreated is required"],
        default: Date.now
    }       
});

// ================
// Validate nested objects into the company objects ======
// ================

CompanySchema.path('pictures').validate(function(pictures){

    return pictures && pictures.length > 0;

}, 'The company needs to have at least one picture');


exports.CompanyValidator = mongoose.model("CompanyValidator", CompanySchema);