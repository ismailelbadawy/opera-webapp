import App from "./app/app";
import EventsController from './controllers/events.controllers';

const app = new App(
  [
    new EventsController()
  ],
  4200,
);
 
app.listen();
