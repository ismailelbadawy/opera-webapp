import { IHallsRepository } from 'shared/repository-base/halls.repository';
import { Hall } from 'shared/domain/hall.model';

export class DatabaseHallsRepository extends IHallsRepository{
    createHall(hall: Hall): Promise<Hall> {
        throw new Error("Method not implemented.");
    }    
    editHall(hall:Hall): Promise<Hall> {
        throw new Error("Method not implemented.");
    }
    viewSeatsForEvent(eventId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}