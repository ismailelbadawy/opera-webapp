import { IReservationsRepository } from '../../../../shared/repository-base/reservations.repository'
import { Reservation } from '../../../../shared/domain/reservation.model';

export class DatabaseReservationsrepository extends IReservationsRepository{
    makeReservation(tickets:Reservation[]): Promise<Reservation[]> {
        throw new Error("Method not implemented.");
    }    
    cancelReservation(reservationId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}