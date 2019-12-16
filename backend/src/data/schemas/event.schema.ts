import { Schema } from "mongoose";
import { ObjectID } from 'bson';

export const SeatSchema = new Schema({
    row : {
        type : Number
    },
    column : {
        type : Number
    },
    isAvailable: {
        type : Boolean
    }
}, { _id : false})

export const EventSchema = new Schema({
    eventName : {
        type : String,
        required : 'missing event name'
    },
    description : {
        type : String,
        required : 'missing description'
    },
    posterUrl : {
        type : String
    },
    startsAt: {
        type: Date
    },
    hallReference : {
        type: ObjectID
    },
    seats : [SeatSchema]
});
