import * as express from 'express';
import { IEventsRepository } from 'shared/repository-base/events.repository';
import { DatabaseEventsRepository } from '../data/repositories/database-events.repository';
import { Hall } from '../../../shared/domain/hall.model'
import { Event } from '../../../shared/domain/event.model'
class EventsController {
    public path = "/events";
    public router = express.Router();

    constructor(private eventsRepository: IEventsRepository) {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
        this.router.post(this.path, this.createEvent);
        this.router.put(this.path, this.editEvent);
        this.router.put(this.path + '/upload-poster', this.uploadPosterUrl);
        this.router.delete(this.path, this.cancelEvent);
        this.router.get(this.path + '/seats', this.getAvailableEvents);
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
            this.eventsRepository.uploadPosterUrl(request.body.eventId, request.body.posterUrl).then((res) => {
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
                new Hall(request.body.hallId, null, null), null)
            this.eventsRepository.createEvent(event).then((dbResponse) => {
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
                new Hall(null, null, null), [])
            this.eventsRepository.editEvent(event).then((dbResponse) => {
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

    cancelEvent = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.eventId) {
                return response.status(400).json({ "message": "no eventId in body was sent" })
            }
            this.eventsRepository.cancelEvent(request.body.eventId).then((dbResponse) => {
                return response.status(200).json(dbResponse)
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })


        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
    getAllEvents = async (request: express.Request, response: express.Response) => {
        try {
            this.eventsRepository.viewAvailableEvents().then((events) => {
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

    getAvailableEvents = async (request : express.Request, response: express.Response) => {
        try{
            let eventId = request.body.eventId;

            this.eventsRepository.getSeatsForEvent(eventId).then((seats) => {
                return response.status(200).json(seats);
            }).catch((error : Error) => {
                console.log(error);
                return response.status(400).json(error);
            })
        }catch(e) {
            return response.status(500).json(e);
        }
    }
}

export default EventsController;