export class Reservation {
    public get pinNumber(): string | null {
        return this._pinNumber;
    }
    public set pinNumber(value: string | null) {
        this._pinNumber = value;
    }
    public get cardNumber(): string | null {
        return this._cardNumber;
    }
    public set cardNumber(value: string | null) {
        this._cardNumber = value;
    }
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
        private _seat: Seat | null,
        private _cardNumber: string | null,
        private _pinNumber: string | null
    ) {

    }
}

export class Seat{
    constructor(
        private _row : number | null,
        private _column: number | null,
        private _available : boolean | null
        ){

        }
}