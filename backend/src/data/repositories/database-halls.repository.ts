import { IHallsRepository } from "../../../../shared/repository-base/halls.repository";
import { Hall } from "../../../../shared/domain/hall.model";

import { HallSchema } from "./../schemas/hall.schema";
import { model } from 'mongoose';

var mongoose = require('mongoose');

const Halls = model('halls', HallSchema);

mongoose.connection;

export class DatabaseHallsRepository extends IHallsRepository {

    createHall(hall: Hall): Promise<Hall> {
        return new Promise((resolve, reject) => {
            try {
                Halls.create({
                    hallName: hall.hallName,
                    hallLength: hall.hallShape,
                    hallWidth: hall.hallShape
                }).then((value) => {
                    if (value == null) {
                        reject('failed to create');
                    } else {
                        resolve(new Hall(value._id, value.get('hallName'), value.get('hallWidth')));
                    }
                }).catch((err) => {
                    reject(err);
                })
            } catch (e) {
                reject(e);
            }
        });
    }
    editHall(hall: Hall): Promise<Hall> {
        return new Promise((resolve, reject) => {
            try {
               Halls.findByIdAndUpdate(hall.hallId, {
                   hallName : hall.hallName,
                   hallWidth : hall.hallShape,
                   hallLength : hall.hallShape
               }, (err, result) => {
                   if(err) {
                       reject(err);
                       return;
                   }
                   Halls.findOne({ _id : hall.hallId}, (err, doc) => {
                       resolve(new Hall(doc._id, doc.get('hallName'), doc.get('hallWidth')));
                   })
               });
            } catch (e) {
                reject(e);
            }
        });
    }


}