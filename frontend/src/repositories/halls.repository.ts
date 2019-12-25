import { Injectable } from "@angular/core";
import { IHallsRepository } from '../../../shared/repository-base/halls.repository';
import { HttpClient } from '@angular/common/http';
import { Hall } from '../../../shared/domain/hall.model';

@Injectable({
    providedIn : 'root'
})
export class WebHallsRepository implements IHallsRepository {
    constructor(private _client : HttpClient) {

    }
    
    async createHall(hall: import("../../../shared/domain/hall.model").Hall): Promise<import("../../../shared/domain/hall.model").Hall> {
        let response : any = await this._client.post('/api/halls', { hallName : hall.hallName, hallShape : hall.hallShape}).toPromise();
        return new Hall(response._hallId, response._hallName, response._hallShape);
    }    
    editHall(hall: import("../../../shared/domain/hall.model").Hall): Promise<import("../../../shared/domain/hall.model").Hall> {
        throw new Error("Method not implemented.");
    }
    async getAllHalls(): Promise<import("../../../shared/domain/hall.model").Hall[]> {
        let response : any = await this._client.get('/api/halls').toPromise()

        return response.map(h => new Hall(h._hallId,h._hallName,h._hallShape))
    }


}