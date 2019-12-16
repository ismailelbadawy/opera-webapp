import * as express from 'express';
import { IUsersRepository } from 'shared/repository-base/users.repository';
import { DatabaseUsersRepository } from '../data/repositories/database-users.repository';
import { User } from '../../../shared/domain/user.model';
import { request } from 'http';

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
        this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.register);
        this.router.delete(this.path, this.removeUser);
        this.router.put(this.path, this.editUser);
        this.router.put(this.path + '/type', this.changeType);
        this.router.post(this.path + '/approve', this.approveUser);
        this.router.get(this.path + '/unapproved', this.getUnapprovedUser);
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
            this.usersRepository.login(request.body.username, request.body.password).then((user) => {
                return response.status(200).json(user);
            }).catch((error) => {
                console.log(error);
                return response.status(401).json(error);
            });
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
            // Address is optional.
            // if (!request.body.address) {
            //     return response.status(400).json({ "message": "no address in body was sent" })
            // }
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
                null,
                false,
                null
            )
            this.usersRepository.register(user, request.body.password).then((dbResponse) => {
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
            await this.usersRepository.removeUser(request.body.userId).then(() => {
                return response.status(200).send();
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
                null,
                null,
                null
            )
            this.usersRepository.approveUser(user).then((dbResponse) => {
                return response.status(200).json(dbResponse)
            }).catch((error) => {
                console.log(error);
                return response.status(400).json(error);
            })

        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }

    changeType = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body.userId) {
                return response.status(400).json({ "message": "no userId in body was sent" })
            }
            if (request.body.userType == null) {
                return response.status(400).json({ "message": "no userType in body was sent" })
            }
            this.usersRepository.changeUserType(request.body.userId, request.body.userType).then((dbResponse) => {
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

    editUser = async (request: express.Request, response: express.Response) => {
        try {
            if (!request.body) {
                return response.status(400).json({ "message": "no body request was sent" })
            }
            if (!request.body.userId) {
                return response.status(400).json({ "message": "no userId in body was sent" })
            }
            let user = new User(
                request.body.userId,
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
                null,
                null,
                null
            )
            this.usersRepository.editData(user).then((dbResponse) => {
                return response.status(200).json(dbResponse)
            }).catch((error) => {
                console.log(error);
                return response.status(500).json(error);
            })
        } catch (error) {
            console.log(error);

        }
    }

    getUnapprovedUser = async (request : express.Request, response : express.Response) => {
        try{
            this.usersRepository.getUnapprovedUsers().then((users) => {
                return response.status(200).json(users);
            }).catch((e) => {
                console.log(e);
                return response.status(500).json(e);
            })
        }catch(e) {
            console.log(e);
            response.status(500).json(e);
        }
    }
}

export default UsersController;