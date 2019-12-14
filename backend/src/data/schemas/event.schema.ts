import { Schema } from "mongoose";
import { ObjectID } from 'bson';

export const EventSchema = new Schema({
    eventName : {
        type : String
    },
    description : {
        type : String
    },
    posterUrl : {
        type : String
    },
    startsAt: {
        type: Date
    },
    hallReference : {
        type: ObjectID
    }
});