import { IReservationsRepository } from '../../../../shared/repository-base/reservations.repository'
import { Reservation } from '../../../../shared/domain/reservation.model';

import { ReservationSchema } from "../schemas/reservation.schema";
import { model } from 'mongoose';

import { UserModel } from "./../repositories/database-users.repository";
import { Events } from "../repositories/database-events.repository";
import { Halls } from "../repositories/database-halls.repository";
import { Seat } from '../../../../shared/domain/event.model';
import { ObjectID } from 'bson';
import { async } from '@angular/core/testing';

export const Reservations = model('reservations', ReservationSchema);

export class DatabaseReservationsrepository extends IReservationsRepository {
    makeReservation(tickets: Reservation[]): Promise<Reservation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let addedTicket = [];
                for (let ticket of tickets) {
                    let user = await UserModel.findOne({ _id: ticket.userId }).exec();
                    if (user == null || user == undefined) {
                        return reject('User not found')
                    }
                    let event = await Events.findOne({ _id: ticket.eventId }).exec();
                    if (event == null || event == undefined) {
                        return reject('Event not found');
                    }

                    let eventSeats: Seat[] = event.get('seats').map(s => new Seat(s.get('row'), s.get('column'), s.get('isAvailable')));

                    if (ticket.seat.row > eventSeats.reduce((previous, current) => {
                        return (previous.row > current.row) ? previous : current;
                    }).row) {
                        return reject('Seat row is out of the hall.');
                    }
                    if (ticket.seat.column > eventSeats.reduce((previous, current) => {
                        return (previous.column > current.column) ? previous : current;
                    }).column) {
                        return reject('Seat column is out of the hall.');
                    }
                    let seatFromEvent = eventSeats.find(s => s.row == ticket.seat.row && s.column == ticket.seat.column);
                    if (seatFromEvent != undefined && seatFromEvent.available) {
                        addedTicket.push({
                            userReference: ticket.userId,
                            eventReference: ticket.eventId,
                            seat: {
                                row: ticket.seat.row,
                                column: ticket.seat.column,
                                isAvailable: ticket.seat.available
                            }
                        });
                        continue;
                    }
                    reject('some seat(s) is either unavailable or does not exist');
                }
                let added = await Reservations.insertMany(addedTicket);
                resolve(added.map(x => new Reservation(x._id, x.get('eventReference'), x.get('userReference'), new Seat(x.get('seat').get('row'), x.get('seat').get('column'), x.get('seat').get('isAvailable')))));
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
    getReservations(userId:string): Promise<Reservation[]> {
        return new Promise(
            async (resolve, reject) => {
                try {
                    Reservations.find({userReference:userId}, async (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            let reservations = res.map(r=> new Reservation(r._id,r.get('eventReference') ,r.get('userReference'),r.get('seat')));
                            resolve(reservations);
                        }
                    });
        }catch (e) {
            reject(e);
        }
    });
}
cancelReservation(reservationId: string): Promise < boolean > {
    return new Promise(async (resolve, reject) => {
        try {
            let deletedObject = await Reservations.remove({ _id: reservationId }).exec()
            resolve(deletedObject.deletedCount > 0);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}


}