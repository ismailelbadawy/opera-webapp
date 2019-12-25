import { Injectable } from "@angular/core";
import { IEventsRepository } from '../../../shared/repository-base/events.repository';
import { Seat } from '../../../shared/domain/event.model';
import { Event } from "../../../shared/domain/event.model";
import { HttpClient } from '@angular/common/http';
import { Hall } from 'shared/domain/hall.model';

@Injectable({
    providedIn : 'root'
})
export class WebEventsRepository implements IEventsRepository {
    async createEvent(event: Event): Promise<Event> {
        let createdEvent : any = await this._client.post('/api/events', { eventName : event.eventName, description : event.description, hallId : event.hall.hallId, startsAt : event.startsAt}).toPromise();
        return new Event(createdEvent._eventId, createdEvent._eventName, createdEvent._description, createdEvent._posterUrl, createdEvent._startsAt, new Hall(createdEvent._hall._hallId, createdEvent._hall._hallName, null), []);
    }    
    cancelEvent(eventId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    uploadPosterUrl(eventId: string, posterUrl: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    editEvent(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    async viewAvailableEvents(): Promise<Event[]> {
        let response : any = await this._client.get('/api/events').toPromise();
        return response.map(s => new Event(s._eventId, s._eventName, s._description, s._posterUrl, s._startsAt, null, null));
    }
    getSeatsForEvent(eventId: string): Promise<Seat[]> {
        throw new Error("Method not implemented.");
    }

    constructor(private _client : HttpClient) {

    }

}