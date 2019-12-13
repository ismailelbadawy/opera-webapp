import { IHallsRepository } from 'shared/repository-base/halls.repository';
import { Hall } from 'shared/domain/hall.model';
import { Seat } from 'shared/domain/reservation.model';

export class DatabaseHallsRepository extends IHallsRepository{
    viewSeatsForEvent(eventId: string): Promise<Seat[][]> {
        throw new Error("Method not implemented.");
    }
    createHall(hall: Hall): Promise<Hall> {
        throw new Error("Method not implemented.");
    }    
    editHall(hall:Hall): Promise<Hall> {
        throw new Error("Method not implemented.");
    }


}