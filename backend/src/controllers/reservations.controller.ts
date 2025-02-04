import * as express from 'express';

import { IReservationsRepository } from '../../../shared/repository-base/reservations.repository';
import { Reservation } from '../../../shared/domain/reservation.model';
import { Seat } from '../../../shared/domain/event.model';
import { DatabaseReservationsrepository } from '../data/repositories/database-reservations.repository';
import { async } from '@angular/core/testing';

class ReservationsController {
    public path = "/reservations";
    public router = express.Router();


    constructor(private reservationsRepository: IReservationsRepository) {
        this.intializeRoutes();

    }

    public intializeRoutes() {
        this.router.post(this.path, this.makeReservation);
        this.router.post(this.path+'/get', this.getReservations);
        this.router.post(this.path + '/delete', this.cancelReservation)
    }

    makeReservation = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ error: 'required body' });
            }
        
            if (!request.body.tickets) {

            }
            for (let index = 0; index < request.body.tickets; index++) {
                let ticket = request.body.tickets[index];
                if (!ticket.eventId) {
                    return response.status(400).json({ error: 'requires an event' });
                }
                if (!ticket.userId) {
                    return response.status(400).json({ error: 'requires a user' });
                }
                if (!ticket.seat) {
                    return response.status(400).json({ error: 'requires a seat' });
                }
                if (!ticket.seat.row) {
                    return response.status(400).json({ error: 'requires a seat' });
                }
                if (!ticket.seat.column) {
                    return response.status(400).json({ error: 'requires a seat' });
                }
            }
            this.reservationsRepository.makeReservation(request.body.tickets.map(s => new Reservation(null, s.eventId, s.userId, new Seat(s.seat.row, s.seat.column, null)))).then((dbResponse) => {
                
                return response.status(201).json(dbResponse);

            }).catch((err) => {
                return response.status(400).json({ error: err });
            });
        } catch (e) {

            response.status(500).json(e);
        }

    }
    cancelReservation = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.ticketId) {
                return response.status(400).json({ "message": "no eventId in body was sent" })
            }
            this.reservationsRepository.cancelReservation(request.body.ticketId).then((dbResponse) => {
                return response.status(200).json(dbResponse)
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })
        }catch(error){
            console.log(error);
            return response.status(500).json(error); 
        }
    }

    getReservations = async(request: express.Request, response: express.Response)=> {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.userId) {
                return response.status(400).json({ "message": "no userId in body was sent" })
            }
  
            this.reservationsRepository.getReservations(request.body.userId).then((reservations) => {
                console.log(reservations)
                return response.status(200).json(reservations)
            }).catch((error: Error) => {
                console.log(error);
                return response.status(500).json(error);
            }
            )
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }

}

export default ReservationsController;