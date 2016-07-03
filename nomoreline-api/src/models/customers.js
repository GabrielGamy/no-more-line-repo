var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Customer = mongoose.model("Customer", new Schema({
    last_name:{
        type: String,
        required: [true, "The last name is required"]
    },
    first_name:{
        type:String,
        required: [true, "The first name is required"]   
    },
    email:{
        type: String, 
        unique: true,
        required: [true, "The email is required"],
        match: [/.+[@].+[.].+/,"Invalid email"]
    },
    password:{
        type: String,
        validate:{
          validator:function(value){
                return /.*[A-Z].*/.test(value)
                    && /.*[a-z].*/.test(value)
                    && /.*[0-9].*/.test(value);
          },
          message: "Password must contain at least one capital letter, one lowercase letter and one number"  
        },
        required: [true, "The password is required"],
        minlength: [8,"Password must be 8 caracters or more"],
        maxlength: [32,"Password must be less than 32 caracters"]
    },
    phone:{
        type: String,
        validate: {
            validator: function(value) {
                return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: '{VALUE} is not a valid phone number!'
        },        
        required: [true, "The phone number is required"]
    },
    postal_code:{
        type: String
    },
    company_catalog:{
        type:Array
    },         
    customer_reservations: { 
        type:Array
    }    
}));

exports.Customer = Customer;