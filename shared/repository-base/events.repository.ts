export abstract class IEventsRepository{
    
    abstract createEvent(event:Event):Promise<Event>;
    abstract cancelEvent(eventId:string):Promise<boolean>;
    abstract uploadPosterUrl(eventId: string, posterUrl : string) : Promise<boolean>;
    abstract editEvent(event:Event):Promise<Event>;
    abstract viewAvailableEvents():Promise<Event[]>;

}