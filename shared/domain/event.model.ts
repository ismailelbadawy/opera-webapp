import { Hall } from './hall.model';

export class Event {
    
    public get eventId(): string | null {
        return this._eventId;
    }
    public set eventId(value: string | null) {
        this._eventId = value;
    }

    public get eventName(): string | null {
        return this._eventName;
    }
    public set eventName(value: string | null) {
        this._eventName = value;
    }

    public get description(): string | null {
        return this._description;
    }
    public set description(value: string | null) {
        this._description = value;
    }

    public get posterUrl(): string | null {
        return this._posterUrl;
    }
    public set posterUrl(value: string | null) {
        this._posterUrl = value;
    }

    public get startsAt(): Date | null {
        return this._startsAt;
    }
    public set startsAt(value: Date | null) {
        this._startsAt = value;
    }

    public get hall(): Hall | null {
        return this._hall;
    }
    public set hall(value: Hall | null) {
        this._hall = value;
    }

    public get seats(): Seat[] | null {
        return this._seats;
    }
    public set seats(value: Seat[] | null) {
        this._seats = value;
    }

    constructor(
        private _eventId: string | null,
        private _eventName: string | null,
        private _description: string | null,
        private _posterUrl: string | null,
        private _startsAt: Date | null,
        private _hall: Hall | null,
        private _seats: Seat[] | null
    ) {

    }
}

export class Seat {
    public get available(): boolean | null {
        return this._available;
    }
    public set available(value: boolean | null) {
        this._available = value;
    }
    public get column(): number | null {
        return this._column;
    }
    public set column(value: number | null) {
        this._column = value;
    }
    public get row(): number | null {
        return this._row;
    }
    public set row(value: number | null) {
        this._row = value;
    }
    constructor(
        private _row: number | null,
        private _column: number | null,
        private _available: boolean | null
    ) {

    }
} 