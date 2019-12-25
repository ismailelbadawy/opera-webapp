import { Injectable } from "@angular/core";
import { IReservationsRepository } from 'shared/repository-base/reservations.repository';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'shared/domain/reservation.model';

@Injectable({
    providedIn: 'root',
})

export class  WebReservationsRepository implements IReservationsRepository{
    constructor(private _client: HttpClient){

    }
   
    makeReservation(tickets: import("../../../shared/domain/reservation.model").Reservation[]): Promise<import("../../../shared/domain/reservation.model").Reservation[]> {
        throw new Error("Method not implemented.");
    }    
    cancelReservation(reservationId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getReservations(userId: string): Promise<import("../../../shared/domain/reservation.model").Reservation[]> {
        let response:any = await this._client.post('api/reservations/get',{userId: userId}).toPromise();
        return response.map(r=> new Reservation(r._ticketId,r._eventId,r._userId,r._seat));
    }


}