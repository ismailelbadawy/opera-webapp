import * as express from 'express';
import { IEventsRepository } from 'shared/repository-base/events.repository';
import { DatabaseEventsRepository } from '../data/repositories/database-events.repository';
import { Event } from 'shared/domain/event.model';
import { Hall } from 'shared/domain/hall.model';
import { request } from 'http';

class EventsController {
    public path = "/events";
    public router = express.Router();

    constructor(private eventsRepository: IEventsRepository) {
        eventsRepository = new DatabaseEventsRepository();
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
        this.router.post(this.path,this.createEvent);
        this.router.put(this.path,this.editEvent);
        this.router.put(this.path+'/poster',this.uploadPosterUrl);
        this.router.delete(this.path,this.cancelEvent);
    }

    uploadPosterUrl = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.eventId) {
                return response.status(400).json({ "message": "no eventId in body was sent" })
            }
            if (!request.body.posterUrl) {
                return response.status(400).json({ "message": "no posterUrl in body was sent" })
            }
            let res = this.eventsRepository.uploadPosterUrl(request.body.eventId, request.body.posterUrl).then(() => {
                return response.status(200).json(res);
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })

        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }

    createEvent = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.eventName) {
                return response.status(400).json({ "message": "no eventName in body was sent" })
            }
            if (!request.body.description) {
                return response.status(400).json({ "message": "no description in body was sent" })
            }
            if (!request.body.startsAt) {
                return response.status(400).json({ "message": "no startsAt in body was sent" })
            }
            if (!request.body.hallId) {
                return response.status(400).json({ "message": "no hallId in body was sent" })
            }
            let event = new Event(
                null,
                request.body.eventName,
                request.body.description,
                request.body.posterUrl,
                request.body.startsAt,
                new Hall(request.body.hallId, null, null))
            let dbResponse = this.eventsRepository.createEvent(event).then(() => {
                return response.status(200).json(dbResponse);
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })
        } catch (error) {
            console.log(error)
            return response.status(500).json(error);
        }
    }

    editEvent = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.eventId) {
                return response.status(400).json({ "message": "no eventId in body was sent" })
            }

             let event = new Event(
                request.body.eventId,
                request.body.eventName,
                request.body.description,
                request.body.posterUrl,
                request.body.startsAt,
                new Hall(null, null, null))
            let dbResponse = this.eventsRepository.editEvent(event).then(() => {
                return response.status(200).json(dbResponse);
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }

    cancelEvent = async(request: express.Request, response: express.Response)=>{
        try{
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.eventId) {
                return response.status(400).json({ "message": "no eventId in body was sent" })
            }
            let dbResponse = this.eventsRepository.cancelEvent(request.body.eventId).then(()=>{
                return response.status(200).json(dbResponse)
            }).catch((error)=>{
                console.log(error);
                return response.status(500).json(error);  
            })


        }catch(error){
            console.log(error);
            return response.status(500).json(error);  
        }
    }
    getAllEvents = async (request: express.Request, response: express.Response) => {
        try {
            let events = this.eventsRepository.viewAvailableEvents().then(() => {
                return response.status(200).json(events)
            }).catch((error: Error) => {
                console.log(error);
                return response.status(500).json(error);
            }
            )
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
}

export default EventsController;