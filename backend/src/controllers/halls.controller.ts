import * as express from 'express';
import { IHallsRepository } from '../../../shared/repository-base/halls.repository';
import { DatabaseHallsRepository } from '../data/repositories/database-halls.repository';
import { Event } from '../../../shared/domain/event.model';
import { Hall } from '../../../shared/domain/hall.model';
class HallsController {

    public path = "/halls";
    public router = express.Router();

    constructor(private hallsRepository: IHallsRepository) {
        hallsRepository = new DatabaseHallsRepository();
        this.initializeRouters()
    }
    public initializeRouters() {

        this.router.post(this.path,this.createHall);
        this.router.put(this.path, this.editHall);
        this.router.get(this.path, this.getHalls);
    }

    createHall = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.hallName) {
                return response.status(400).json({ "message": "no hallName in body was sent" })
            }
            if (!request.body.hallShape) {
                return response.status(400).json({ "message": "no hallShape in body was sent" })
            }
            let hall = new Hall(
                null,
                request.body.hallName,
                request.body.hallShape
            )
            this.hallsRepository.createHall(hall).then((dbResponse) => {
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
    editHall = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.hallId) {
                return response.status(400).json({ "message": "no hallId in body was sent" })
            }

            let hall = new Hall(
                request.body.hallId,
                request.body.hallName,
                request.body.hallShape
            )
            this.hallsRepository.editHall(hall).then((dbResponse) => {
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

    getHalls = async (request : express.Request, response : express.Response) => {
        try{
            let halls = await this.hallsRepository.getAllHalls();
            return response.status(200).json(halls);
        }catch(e) {
            console.log(e);
            response.status(500).json(e);
        }
    }

}

export default HallsController;