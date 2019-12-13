import * as express from 'express';
import { IUsersRepository } from 'shared/repository-base/users.repository';
import { DatabaseUsersRepository } from '../data/repositories/database-users.repository';
import { User } from 'shared/domain/user.model';

class UsersController {
    public path = '/users'
    public router = express.Router();

    constructor(
        private usersRepository: IUsersRepository
    ) {
        usersRepository = new DatabaseUsersRepository();
        this.initializeRoutes();
    }
    public initializeRoutes() {
        this.router.post(this.path, this.login);

    }

    login = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.username) {
                return response.status(400).json({ "message": "no username in body was sent" })
            }
            if (!request.body.password) {
                return response.status(400).json({ "message": "no password in body was sent" })
            }
            let user = this.usersRepository.login(request.body.username, request.body.password.then(() => {
                return response.status(200).json(user);
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            }))
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
    register = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.username) {
                return response.status(400).json({ "message": "no username in body was sent" })
            }
            if (request.body.userType == null) {
                return response.status(400).json({ "message": "no userType in body was sent" })
            }
            if (!request.body.firstName) {
                return response.status(400).json({ "message": "no firstName in body was sent" })
            }
            if (!request.body.lastName) {
                return response.status(400).json({ "message": "no lastName in body was sent" })
            }
            if (!request.body.gender) {
                return response.status(400).json({ "message": "no gender in body was sent" })
            }
            if (!request.body.city) {
                return response.status(400).json({ "message": "no city in body was sent" })
            }
            if (!request.body.email) {
                return response.status(400).json({ "message": "no email in body was sent" })
            }
            if (!request.body.address) {
                return response.status(400).json({ "message": "no address in body was sent" })
            }
            if (!request.body.birthDate) {
                return response.status(400).json({ "message": "no birthDate in body was sent" })
            }
            if (!request.body.password) {
                return response.status(400).json({ "message": "no password in body was sent" })
            }

            let user = new User(
                null,
                request.body.userType,
                request.body.username,
                request.body.firstName,
                request.body.lastName,
                request.body.birthDate,
                request.body.gender,
                request.body.city,
                request.body.email,
                request.body.address,
                null,
                null
            )

            let dbResponse = this.usersRepository.register(user, request.body.password).then(() => {
                return response.status(200).json(dbResponse)
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error)
            });

        } catch (error) {
            console.log(error);
            return response.status(500).json(error)
        }
    }

    removeUser = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.userId) {
                return response.status(400).json({ "message": "no userId in body was sent" })
            }
            let dbResponse = await this.usersRepository.removeUser(request.body.userId).then(() => {
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
    approveUser = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body.userId) {
                return response.status(400).json({ "message": "no userId in body was sent" })
            }
            let user = new User(
                request.body.userId,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            )
            let dbResponse = this.usersRepository.approveUser(user).then(() => {
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
}

export default UsersController;