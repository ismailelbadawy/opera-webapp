import { Hall } from 'shared/domain/hall.model';

export abstract class IHallsRepository{

    abstract createHall(hall:Hall):Promise<Hall>;
    abstract editHall(hall:Hall):Promise<Hall>;
    abstract getAllHalls() : Promise<Hall[]>;
}