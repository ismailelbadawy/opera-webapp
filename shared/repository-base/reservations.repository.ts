import { Reservation } from 'shared/domain/reservation.model';

export abstract class IReservationsRepository{
    abstract makeReservation(tickets:Reservation[]):Promise<Reservation[]>;
    abstract cancelReservation(reservationId:string):Promise<boolean>;
}