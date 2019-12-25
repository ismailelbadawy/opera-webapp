import { IEventsRepository } from '../../../../shared/repository-base/events.repository';
import { Event, Seat } from '../../../../shared/domain/event.model';
import { EventSchema } from '../schemas/event.schema';
import { model } from 'mongoose';
import { HallSchema } from '../schemas/hall.schema';
import { ObjectID } from "bson"
import { Hall } from '../../../../shared/domain/hall.model';
import { Halls } from "./database-halls.repository";

var mongoose = require('mongoose');

export const Events = model('events', EventSchema);

mongoose.connection;

export class DatabaseEventsRepository implements IEventsRepository {
    
    getSeatsForEvent(eventId : string): Promise<Seat[]> {
        return new Promise(async (resolve, reject) => {
            try{
                let eventDb = await Events.findOne({ _id : eventId}).exec();
                let event = new Event(eventDb.get('_id'), eventDb.get('eventName'), eventDb.get('description'), eventDb.get('posterUrl'), eventDb.get('startsAt'), null, eventDb.get('seats').map(s => new Seat(s.get('row'), s.get('column'), s.get('isAvailable'))));
                let seats = event.seats.filter(x => x.available);
                resolve(seats);
            }catch(e) {
                reject(e);
            }
        });
    }

    createEvent(event: Event): Promise<Event> {
        return new Promise(async (resolve, reject) =>  {
            try {
                let hall = await Halls.findOne({ _id : event.hall.hallId}).exec();
                if(hall == undefined || hall == null) {
                    reject({error: 'hall not found'});
                }
                let seats = [];
                for (let i = 0; i < hall.get('hallWidth'); i++) {
                    for(let j = 0; j < hall.get('hallWidth'); j++) {
                        seats.push({
                            row : i,
                            column : j,
                            isAvailable : true
                        });
                    }
                }
                Events.create({
                    eventName:event.eventName,
                    description:event.description,
                    posterUrl:event.posterUrl,
                    startsAt:event.startsAt,
                    hallReference : hall._id,
                    seats : seats
                }).then((value) => {
                    if (value == null) {
                        reject('failed to create');
                    } else {
                        resolve(
                            new Event(value._id, 
                                value.get('eventName'), 
                                value.get('description'), 
                                value.get('posterUrl'), 
                                value.get('startsAt'), 
                                new Hall(hall._id, hall.get('hallName'), hall.get('hallWidth')), 
                                seats.map(x => new Seat(x.row, x.column, x.isAvailable))));
                    }
                }).catch((err) => {
                    reject(err);
                })
            } catch (e) {
                reject(e);
            }
        });
    }    
    cancelEvent(eventId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try{
                let count = await Events.deleteOne({ _id : eventId}).exec();
                resolve(count.deletedCount != 0);
            }catch(e) {
                reject(e);
            }
        });
    }
    uploadPosterUrl(eventId: string, posterUrl: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try{
                Events.findByIdAndUpdate(eventId, {
                    posterUrl: posterUrl
                }, async (err, result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(true);
                    }
                })
            }catch(e) {
                reject(e)
            }
        });
    }
    editEvent(event: Event): Promise<Event> {
        return new Promise((resolve, reject) => {
            try{
                Events.findByIdAndUpdate(event.eventId, {
                    eventName : event.eventName,
                    description : event.description,
                    startsAt : event.startsAt
                }, async (err, value) => {
                    if(err) {
                        reject(err);
                    }else{
                        let hall = await Halls.findOne({ _id : value.get('hallReference')}).exec();
                        resolve(new Event(value._id, value.get('eventName'), value.get('description'),value.get('posterUrl'),value.get('startsAt'), new Hall(hall._id, hall.get('hallName'), hall.get('hallWidth')), value.get('seats').map(s => new Seat(s.row, s.column, s.isAvailable))));
                    }
                })
            }catch(e) {
                reject(e)
            }
        });
    }
    viewAvailableEvents(): Promise<Event[]> {
        return new Promise((resolve, reject) => {
            try {
                Events.find({}, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        let events = result.map(s => new Event(s._id, s.get('eventName'), s.get('description'),s.get('posterUrl'),s.get('startsAt'), null, s.get('seats').map(z => new Seat(z.row, z.column, z.isAvailable))));
                        resolve(events);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    
}