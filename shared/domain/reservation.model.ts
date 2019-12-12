export class Reservation {
    constructor(
        private _ticketId: string,
        private _eventId: string,
        private _userId:string,
        private _row: number,
        private _column: number
    ) {

    }
}