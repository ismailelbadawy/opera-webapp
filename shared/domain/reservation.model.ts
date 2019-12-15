import { Seat } from "./event.model";
export class Reservation {
    
    public get seat(): Seat | null {
        return this._seat;
    }
    public set seat(value: Seat | null) {
        this._seat = value;
    }
    public get userId(): string | null {
        return this._userId;
    }
    public set userId(value: string | null) {
        this._userId = value;
    }
    public get eventId(): string | null {
        return this._eventId;
    }
    public set eventId(value: string | null) {
        this._eventId = value;
    }
    public get ticketId(): string | null {
        return this._ticketId;
    }
    public set ticketId(value: string | null) {
        this._ticketId = value;
    }
    constructor(
        private _ticketId: string | null,
        private _eventId: string | null,
        private _userId: string | null,
        private _seat: Seat | null
    ) {

    }
}
