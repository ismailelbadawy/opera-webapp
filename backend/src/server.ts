import App from "./app/app";
import EventsController from './controllers/events.controllers';
import { DatabaseEventsRepository } from './data/repositories/database-events.repository';
import UsersController from './controllers/users.controller';
import { DatabaseUsersRepository } from './data/repositories/database-users.repository';
import HallsController from './controllers/halls.controller';
import { DatabaseHallsRepository } from './data/repositories/database-halls.repository';

const app = new App(
  [
    new HallsController(new DatabaseHallsRepository()),
    new UsersController(new DatabaseUsersRepository())
  ],
  4200,
);
 
app.listen();
