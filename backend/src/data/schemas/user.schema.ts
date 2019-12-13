import { Schema } from "mongoose";

export const UserSchema : Schema = new Schema({
    userId : {
        type : String,
        required : 'A user must have an id',
        index : true
    },
    userName : {
        type : String,
        index: true 
    },
    email : {
        type : String,
        required : function() {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(this.email);
        },
        index : true
    },
    firstName : {
        type : String
    },
    lastName : {
        type: String
    },
    gender : {
        type : String,
        enum: ['male', 'female']
    },
    birthDate : {
        type: Date
    },
    city : {
        type : String
    },
    password : {
        passwordHash : {
            type : String,
            required: 'Password hash must be present'
        },
        passwordSalt : {
            type : String,
            required : `Pasword salt must be present`
        },
        required : 'Password must be present'
    },
    address : {
        type: String
    }
});
