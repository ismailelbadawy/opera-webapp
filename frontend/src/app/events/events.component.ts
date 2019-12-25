import { Component, OnInit } from '@angular/core';
import { IEventsRepository } from '../../../../shared/repository-base/events.repository';
import { Event } from "../../../../shared/domain/event.model";
import { IUsersRepository } from '../../../../shared/repository-base/users.repository';
import { UserType } from 'shared/domain/user.model';
import { Hall } from 'shared/domain/hall.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events : Event[] = [];
  hasError : boolean = false;
  isLoading : boolean = false;
  addingEvent : boolean = false;
  isOperaManager;
  constructor(private _repo : IEventsRepository, private _usersRepo : IUsersRepository) { 
    this.isOperaManager = (this._usersRepo.getUserInfo()).userType == UserType.MANAGER;
    
  }

  ngOnInit() {
    this.getEvents();
  }

  toggleEdit() {
    this.addingEvent = !this.addingEvent;
  }

  async getEvents() {
    this.isLoading = true;
    try{
      let events = await this._repo.viewAvailableEvents();
      this.events = events;
    }catch(e) {
      this.events = [
        new Event('0', 'Event 1', 'This is balabalanlanna', 'http://lebanononline.tv/wp-content/uploads/2016/02/4.jpg', new Date(2019, 12, 26), new Hall('0', 'NANI', 30), []),
        new Event('1', 'Event 2', 'This is another bla bla bla blac', 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', new Date(2019, 12, 29, 10, 30), null, null)
      ]
      this.hasError = true;
    }finally {
      this.isLoading = false;
    }

  }
}
