var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var minLen = 8, maxLen = 32;

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
        match: [/.+[@].+[.].+/,"Invalid email format"]
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
        required: [true, 'The Password is required'],
        minlength: [minLen,"Password must be " + minLen + " caracters or more"],
        maxlength: [maxLen,"Password must be less than " + maxLen + " caracters"]
    },
    phone:{
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: '{VALUE} is not a valid phone number!'
        },        
        required: [true, 'The Phone number is required']
    },
    address:{
        type: String,
        trim: true,
        maxlength: [maxLen,"Address must be less than " + maxLen + " caracters"]
    },
    postal_code:{
        type: String,
        trim: true,
        maxlength: [maxLen,"Postal code must be less than " + maxLen + " caracters"]
    },
    company_catalog:{
        type:Array
    },         
    customer_reservations: { 
        type:Array
    }    
}));

exports.Customer = Customer;