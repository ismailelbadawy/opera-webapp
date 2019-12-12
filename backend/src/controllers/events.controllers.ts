import * as express from 'express';

class EventsController {
    public path = "/events";
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
    }

    getAllEvents = async (request: express.Request, response: express.Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default EventsController;