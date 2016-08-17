// ================
// Model Object Validator ======
// ================

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var maxLen = 200;

var emailRegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

var phoneNumberRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // US and CANADA

var postalCodeRegEXP = /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/; // US and CANADA

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
    name:{
        type: String,
        trim: true,
        required: [true, 'The name of the company is required'],
        maxlength: [maxLen,"The of the company must be less than " + maxLen + " caracters"]
    },
    email:{
        type: String, 
        unique: true,
        trim: true,
        required: [true, 'The email of the company is required'],
        maxlength: [maxLen,"The email must be less than " + maxLen + " caracters"],
        match: [emailRegExp,"Invalid email format"]
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
        maxlength: [maxLen,"The description must be less than " + maxLen + " caracters"]
    },
    services:{
        type: String,
        trim: true,
        required: [true, 'The services is required']
    },
    opening_hours:[{
        day_of_the_week:{
            type: String,
            trim: true,
            required: [true, "[opening_hours] - The day of the week is required"]
        },
        opening_time:{
            type: String,
            trim: true,
            required: [true, "[opening_hours] - The opening time is required"]
        },
        closing_time:{
            type: String,
            trim: true,
            required: [true, "[opening_hours] - The closing time is required"]
        }                
    }],
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
        type: String
    },
    chief:{
        type: String,
        trim: true,
        required: [true, 'The name of the chief is required'],
        maxlength: [maxLen,"The name of the chief must be less than " + maxLen + " caracters"]
    },
    pictures:{
        type: String
    },
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
    certifications:{
        type: String
    }   
});

CompanySchema.path('opening_hours').validate(function(opening_hours){
    console.log(opening_hours.length);
    if(!opening_hours){
        return false
    }else if(opening_hours.length === 0){
        return false
    }
    return true;
}, 'The company needs to have at least one opening hour');


var CompanyValidator = mongoose.model("CompanyValidator", CompanySchema);

exports.CompanyValidator = CompanyValidator;