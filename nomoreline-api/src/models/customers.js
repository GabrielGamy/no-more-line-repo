var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var minLen = 8, maxLen = 32;
var emailRegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
var phoneNumberRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // US and CANADA
var postalCodeRegEXP = /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/; // US and CANADA

var Customer = mongoose.model("Customer", new Schema({
    last_name:{
        type: String,
        trim: true,
        required: [true, 'The last name is required'],
        maxlength: [maxLen,"The last name must be less than " + maxLen + " caracters"]
    },
    first_name:{
        type:String,
        trim: true,
        required: [true, 'The first name is required'],
        maxlength: [maxLen,"The first name must be less than " + maxLen + " caracters"]    
    },
    email:{
        type: String, 
        unique: true,
        trim: true,
        required: [true, 'The email is required'],
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
        maxlength: [maxLen * 4,"Password must be less than " + maxLen * 4 + " caracters"] // password will be hashed
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
    address:{
        type: String,
        trim: true,
        maxlength: [maxLen,"Address must be less than " + maxLen + " caracters"]
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
        }
    },
    company_catalog:{
        type:Array
    },         
    customer_reservations: { 
        type:Array
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }, 
    endDate:{
        type: Date,
        default: null
    }    
}));

exports.Customer = Customer;