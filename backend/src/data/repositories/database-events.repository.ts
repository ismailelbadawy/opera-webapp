import { IEventsRepository } from 'shared/repository-base/events.repository';
import { Event } from 'shared/domain/event.model';

export class DatabaseEventsRepository implements IEventsRepository {
    createEvent(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
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
    viewAvailableEvents(): Promise<Event[]> {
        throw new Error("Method not implemented.");
    }

    
}