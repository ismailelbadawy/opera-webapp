import { Schema } from "mongoose";

export const HallSchema = new Schema({
    hallName : {
        type : String,
        index: true,
        required : 'missing hall name'
    },
    hallWidth : {
        type: Number,
        required: 'missing hall width'
    },
    hallLength : {
        type : Number,
        required: 'missing hall length'
    }
});