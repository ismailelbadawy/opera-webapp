import { Hall } from 'shared/domain/hall.model';
import { Seat } from 'shared/domain/reservation.model';

export abstract class IHallsRepository{

    abstract createHall(hall:Hall):Promise<Hall>;
    abstract editHall(hall:Hall):Promise<Hall>;
    abstract viewSeatsForEvent(eventId : string):Promise<Seat[][]>;
}