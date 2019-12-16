import { Schema } from "mongoose";
import { ObjectID } from 'bson';

import { SeatSchema } from "./event.schema";

export const ReservationSchema = new Schema({
    userReference : {
        type : ObjectID,
        required : 'you must specify a reserver'
    },
    eventReference : {
        type: ObjectID,
        required : 'you must specify an event'
    },
    seat : {
        type : SeatSchema,
        required : 'you must specify a seat'
    }
});