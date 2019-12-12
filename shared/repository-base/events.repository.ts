export abstract class IEventsRepository{
    
    abstract createEvent(event:Event):Promise<Event>;
    abstract cancelEvent(eventId:string):Promise<boolean>;
    //Upload poster somehow 
    abstract editEvent(event:Event):Promise<Event>;
    abstract viewAvailableEvents():Promise<Event[]>;

}