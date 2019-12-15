import { Schema } from "mongoose";
import { ObjectID } from 'bson';

export const ReservationSchema = new Schema({
    userReference : {
        type : ObjectID
    },
    eventReference : {
        type: ObjectID
    },
    seat : {
        
    }
});